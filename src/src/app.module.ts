import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from '../db/typeorm.config' 
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ 
    ConfigModule.forRoot({
      envFilePath: '.development.env', 
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    CompaniesModule,
    AuthModule,
  ],
})
export class AppModule {}
