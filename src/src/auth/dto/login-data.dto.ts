import { ApiProperty } from "@nestjs/swagger"


export class LoginDataDto {
    @ApiProperty({
        description: 'The user`s email',
        example: 'ek@gmail.com',
    }) 
    username: string

    @ApiProperty({
        description: 'The user`s password',
        example: 'Pass@!h61s3',
    })
    password: string

}