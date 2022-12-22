import { ApiProperty } from "@nestjs/swagger"


export class TokenDto {
    @ApiProperty({
        description: 'Auth token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZWtAZ21haWwuY29tIiwic3ViIjo0NiwiaWF0IjoxNjcxNjM2NDAwLCJleHAiOjE2NzE2MzgyMDB9.CLUaD0-IRlfJr0ld-n9FqU6-R2clwfuJyR5YPnh5u0Y',
    }) 
    access_token: string
}