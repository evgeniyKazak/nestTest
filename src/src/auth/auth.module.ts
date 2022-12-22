import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy'
import { UserLoginListener } from './listeners/user-login.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, UserLoginListener], 
  controllers: [AuthController],
  imports: [
    UsersModule, 
    PassportModule.register({session: true}), 
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('APP_SECRET_KEY'),
        signOptions: {
            expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
  ]
})
export class AuthModule {}
