import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserLoggedInEvent } from 'src/auth/events/user-login.event'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private eventEmitter: EventEmitter2
    ){}

    async validateUser(email: string, password: string): Promise<Users | null> {
        const user = await this.userService.findByEmail(email)
        if (user && await bcrypt.compare(password, user.password))
            return user;
        else 
            return null
    }

    login(user: any): TokenDto {
        const token = new TokenDto()
        token.access_token = this.jwtService.sign({
            email: user.email,
            id: user.id,
        })

        const loggedInEvent = new UserLoggedInEvent();
        loggedInEvent.id = user.id
        loggedInEvent.eventDate = new Date();
        this.eventEmitter.emit('users.loggedin', loggedInEvent);

        return token
    }
}
