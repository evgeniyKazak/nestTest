import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users.service';

import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
  } from 'class-validator';

export function isEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: CustomEmailvalidation, 
      });
    };
  }

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class CustomEmailvalidation implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    return this.usersService.findByEmail(value)
      .then((user) => {
        return !user
      });
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} is already taken`;
  }
}