import { Body, Controller, Get, HttpStatus, Post, UseGuards, ValidationPipe, Request, Param, ParseIntPipe, HttpException, UnprocessableEntityException, UsePipes, Delete, Query, DefaultValuePipe, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiExtraModels, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse, getSchemaPath, refs } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { AddUserDto } from './dto/add-user.dto'
import { UsersService } from 'src/users/users.service';
import { OwnerValidationPipe } from './pipes/owner-validation.pipe'
import { UserEmailExistsValidationPipe } from './pipes/user-email-exists-validation.pipe';
import { CompanyResponseDto } from './dto/company-response.dto'
import { CompaniesDto } from './dto/companies.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
    constructor(
        private companiesService: CompaniesService,
        private usersService: UsersService
    ){}
    
    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({
        description: 'Company has been successfully created',
        type: CompanyResponseDto
    })
    @ApiUnauthorizedResponse({description: 'Unauthorized response'})
    @ApiUnprocessableEntityResponse({ description: 'Wrong data' })
    async createCompany(
        @Request() req, 
        @Body(new ValidationPipe({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          })) createCompanyDto: CreateCompanyDto
      ) { 
        const company = await this.companiesService.createCompany(createCompanyDto, req.user.id);
        const dto = new CompanyResponseDto()
        dto.id = company.id
        return dto
    }

    @Post(':id/user')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number })
    @ApiBearerAuth()
    @ApiCreatedResponse({
        description: 'User has been successfully added to company', 
    })
    @ApiUnauthorizedResponse({description: 'Unauthorized response'})
    @ApiUnprocessableEntityResponse({ description: 'Wrong data.' })
    async addUser(
        @Request() req, 
        @Body(
            new ValidationPipe({ 
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            }),
            UserEmailExistsValidationPipe // adds user object to DTO after validation for doing less requests count to db
        ) addUserDto: AddUserDto,
        @Param('id', ParseIntPipe, OwnerValidationPipe) id: number,
      ): Promise<void> {     
        this.companiesService.linkUser(id, addUserDto.user, req.user.id);
    }

    @Delete(':id/user')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number })
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'User has been successfully removed', 
    })
    @ApiUnauthorizedResponse({description: 'Unauthorized response'})
    @ApiNotFoundResponse({description: 'User not found'})
    @ApiUnprocessableEntityResponse({ description: 'Wrong data.' })
    async removeUser(
        @Request() req, 
        @Body(
            new ValidationPipe({ 
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            }),
            UserEmailExistsValidationPipe // adds user object to Dto after validation for doing less requests count to db
        ) addUserDto: AddUserDto,
        @Param('id', ParseIntPipe, OwnerValidationPipe) id: number,
      ): Promise<void> {   
        if (addUserDto.user.id == req.user.id) throw new UnprocessableEntityException('You can`t remove owner user');
        try {
            await this.companiesService.unlinkUser(id, addUserDto.user, req.user.id);
        } catch (error: unknown) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
    }

    @Get()
    @UseGuards(OptionalJwtAuthGuard)
    @ApiExtraModels(CompaniesDto, AddUserDto)
    // @ApiOkResponse({
    //     description: 'Full list of company names OR Your list with users if you are authorized', 
    //     type: CompaniesDto,
    //     isArray: true
    // })

    @ApiOkResponse({
        description: 'More or less dangerous animals',
        // isArray: true,
        schema: {
          items: {
            oneOf: [
              { 
                // type: 'array', 
                $ref: getSchemaPath(CompaniesDto) 
                },
              {
                type: 'string',
                example: ['Company 1', 'Company 1']
              }
            ],
          },
        },
        // content: {
        //             'application/json': {
        //                 examples: {
        //                     Authorized: {$ref: getSchemaPath(CompaniesDto) },
        //                     Unauthorized: { $ref: getSchemaPath(CompaniesDto) },
        //                 },
        //             },
        //         },
      })

    @ApiBearerAuth()
    async getCompanies(@Request() req): Promise<CompaniesDto[] | string[]> {
        const companies = await this.companiesService.findAll(req.user?.id)
        if (req.user?.id) 
            return companies.map(c => new CompaniesDto(c))
        else 
            return companies.map(c => c.name)
    }
}
