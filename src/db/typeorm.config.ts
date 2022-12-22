import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],

  useFactory: async(configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('MYSQL_HOST'),
      port: 3306,
      username: configService.get('MYSQL_USER'),
      password: configService.get('MYSQL_PASSWORD'),
      database: configService.get('MYSQL_DATABASE'),
      // entities: [Users, Companies, CompanyUsers],
      entities: [__dirname + '/../dist/**/*.entity.js', __dirname + '/../**/*.entity.js'], 
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false,
      dropSchema: false,
      logging: true,
      retryAttempts: 1
    }),


};
