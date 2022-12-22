import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomEmailvalidation } from './validators/unique.users';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, CustomEmailvalidation], 
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
 