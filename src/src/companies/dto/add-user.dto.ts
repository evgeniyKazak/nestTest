import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Users } from "src/users/users.entity";

export class AddUserDto {
    @ApiProperty({
        description: 'Email address of existing user',
        example: 'someTestUser@mail.com',
    })
    @IsNotEmpty()
    @MaxLength(255) 
    @IsEmail()
    email: string

    user: Users
}