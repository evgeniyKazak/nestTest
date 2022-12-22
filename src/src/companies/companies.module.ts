import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Companies } from './companies.entity';
import { CompanyUsers } from './company-users.entity';
import { UsersModule } from 'src/users/users.module';
import { OwnerValidationPipe } from './pipes/owner-validation.pipe';
import { UserEmailExistsValidationPipe } from './pipes/user-email-exists-validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Companies, CompanyUsers]),
    UsersModule
  ],  
  controllers: [CompaniesController], 
  providers: [
    CompaniesService,
    OwnerValidationPipe,
    UserEmailExistsValidationPipe
  ]
})
export class CompaniesModule {}