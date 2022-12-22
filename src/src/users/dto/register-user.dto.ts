import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { isEmailUnique } from '../validators/unique.users';


export class RegisterUserDto {
    @ApiProperty({
        description: 'The name of the User',
        example: 'Jack',
    })
    @IsNotEmpty()
    firstName: string

    @ApiProperty({
        description: 'The surname of the User',
        example: 'Smith',
    })
    @IsNotEmpty()
    lastName: string

    @ApiProperty({
        description: 'The email address of the User',
        example: 'jhon.doe@gmail.com',
    }) 
    @IsNotEmpty() 
    @IsEmail()
    @isEmailUnique()
    email: string

    @ApiProperty({
        description: 'The password of the User',
        example: 'Pass@!h61s3',
    })
    @IsNotEmpty()
    @Length(8, 24)
    @Matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
        { 
            message: 'Password should have 1 upper case, lowcase letter along with a number and special character.' 
        }
    )
    password: string

}