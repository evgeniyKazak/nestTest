import { ApiProperty } from '@nestjs/swagger';
import { Companies } from '../companies.entity'
import { CompanyUsers, LinkType } from '../company-users.entity';

export class UserDto {
    constructor(companyUser: Partial<CompanyUsers>) {
        this.type = companyUser.type
        this.firstName = companyUser.user?.firstName
        this.lastName = companyUser.user?.lastName
        this.email = companyUser.user?.email
    }

    @ApiProperty({
        description: 'User firstname',
        example: 'Nick'
    })
    firstName: string

    @ApiProperty({
        description: 'User lastname',
        example: 'Mickov'
    })
    lastName: string

    @ApiProperty({
        description: 'User email',
        example: 'NickMickov@mail.com'
    })
    email: string

    @ApiProperty({
        description: 'User type',
        enum: LinkType
    })
    type: LinkType
}

export class CompaniesDto {
    constructor(compnay: Partial<Companies>) {
        this.name = compnay.name
        this.users = compnay.users?.map(u => new UserDto(u))    
    }

    @ApiProperty({
        description: 'Company name',
        example: 'Company 1',
    })
    name: string

    @ApiProperty({
        description: 'Company users',
        isArray: true,
        type: () => UserDto
    })
    users: UserDto[]
}