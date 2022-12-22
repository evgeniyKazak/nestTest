import { PipeTransform, Injectable, ArgumentMetadata, Request, Scope, Inject, UnprocessableEntityException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core'
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CompaniesService } from '../companies.service';

@Injectable({ scope: Scope.REQUEST })
export class OwnerValidationPipe implements PipeTransform<any> {
  constructor(
      @Inject(REQUEST) protected readonly req,
      private companiesService: CompaniesService
    ) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    const link = await this.companiesService.findOwnerLink(value, this.req.user.id)
    if (!link) throw new UnprocessableEntityException('You are not an owner of the company with id: ' + value)
    return value;
  }
}