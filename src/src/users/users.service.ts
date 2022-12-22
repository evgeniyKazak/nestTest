import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async register(registerUserDto: RegisterUserDto) {
        const user = this.usersRepository.create(registerUserDto)
        await this.usersRepository.save(user)
    }

    async findByEmail(email: string): Promise<Users | undefined> {
        return this.usersRepository.findOneBy({email})
    }

    async findById(id: number): Promise<Users | undefined> {
        return this.usersRepository.findOne({where: {id}})
    }

    async updateLoginData(id: number, date: Date) {
        const user = await this.findById(id)
        user.lastLoggedAt = date
        user.loggedInCounts++ 
        this.usersRepository.save(user)
    }
}
