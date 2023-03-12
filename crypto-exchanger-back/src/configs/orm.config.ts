import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Verification } from "src/users/entities/verification.entity";

export const isDev = process.env.NODE_ENV === 'dev';

export const ormClientOptions = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    console.log(configService)
    return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    synchronize: isDev,
    logging: isDev,
    entities: [User, Verification],
  }},
  inject: [ConfigService]
});