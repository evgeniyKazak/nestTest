import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCompanyDto {
    @ApiProperty({
        description: 'The name of the new Company',
        example: 'My test company',
    })
    @IsNotEmpty()
    @MaxLength(255)
    name: string
} 