import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from "./auth.service";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
            private authService: AuthService,
            private configService: ConfigService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('APP_SECRET_KEY')
        }); 
    }

    async validate(payload: any, done: VerifiedCallback) {
        return {
            id: payload.id,
            email: payload.email
        }
    }
}