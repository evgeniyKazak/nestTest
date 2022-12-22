import { PipeTransform, Injectable, ArgumentMetadata, Request, Scope, Inject, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable({ scope: Scope.REQUEST })
export class UserEmailExistsValidationPipe implements PipeTransform<any> {
  constructor(
      private usersService: UsersService
    ) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    const user = await this.usersService.findByEmail(value.email)
    if (!user) throw new UnprocessableEntityException('Email is not exist')
    if (!value.user) value.user = user
    
    return value;
  }
}