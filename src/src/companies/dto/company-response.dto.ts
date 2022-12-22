import { ApiProperty } from "@nestjs/swagger";

export class CompanyResponseDto {
    @ApiProperty({
        description: 'Company ID',
        example: '12',
    })
    id: number;
    

    name: string;
}