import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('/register')
    @ApiCreatedResponse({
        description: 'User has been successfully registered',
        type: RegisterUserDto,
      })
    @ApiUnprocessableEntityResponse({ description: 'User cannot register.' })
    registration(
        @Body(new ValidationPipe({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          })) userRegister: RegisterUserDto,
      ) { 
        this.usersService.register(userRegister);
    }
}
