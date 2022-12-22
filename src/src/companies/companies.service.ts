import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Companies } from './companies.entity';
import { CompanyUsers, LinkType } from './company-users.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Users } from 'src/users/users.entity';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Companies) private companyRepository: Repository<Companies>,
        @InjectRepository(CompanyUsers) private companyUserRepository: Repository<CompanyUsers>,
        private dataSource: DataSource
    ) {}

    async createCompany(createCompanyDto: CreateCompanyDto, ownerId: number): Promise<Companies> {
        const company = this.companyRepository.create(createCompanyDto)
        const companyUser = new CompanyUsers()
        companyUser.userId = ownerId

        await this.dataSource.transaction(async manager => {
            await manager.save(company);
            companyUser.companyId = company.id
            await manager.save(companyUser);
        });

        return company
    }

    async findOwnerLink(companyId: number, userId: number): Promise<CompanyUsers> {
        return await this.companyUserRepository
            .createQueryBuilder("company_user")
            .leftJoinAndSelect("company_user.company", "company")
            .where(
                'companyId = :companyId AND userId = :userId', 
                {companyId: companyId, userId: userId}
            )
            .andWhere('type = :type', {type: LinkType.OWNER})
            .getOne()
    }

    async linkUser(companyId: number, user: Users, ownerId: number): Promise<any> {
        const link = new CompanyUsers()
        link.companyId = companyId
        link.userId = user.id
        link.type = LinkType.EMPLOYEE
        link.createdBy = ownerId

        return this.companyUserRepository.save(link)
    }

    async unlinkUser(companyId: number, user: Users, ownerId: number): Promise<any> {
        const link = await this.companyUserRepository.findOneByOrFail({
            companyId: companyId,
            userId: user.id,
            createdBy: ownerId
        })
        
        return this.companyUserRepository.remove(link)
    }

    async findAll(id: number = null): Promise<Companies[]> {
        if (!id) {
            return this.companyRepository.find()
        }

        const companyIds = await this.companyRepository
        .createQueryBuilder("companies")
        .select(['companies.id'])
        .innerJoin("companies.users", "users")
        .where('users.userId = :id', {id: id})
        .getRawMany()

        if (!companyIds.length) return []

        return this.companyRepository
            .createQueryBuilder("companies") 
            .innerJoinAndSelect("companies.users", "users")
            .innerJoinAndSelect("users.user", "user")
            .where('companies.id IN (:...ids)', {ids: companyIds.map(company => company.companies_id)})
            .getMany()
    }
    
}
