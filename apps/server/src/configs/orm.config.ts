import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { BotUser } from "src/bot/users/entities/bot-user.entity";
import { User } from "src/users/entities/user.entity";
import { Verification } from "src/users/entities/verification.entity";

const nodeEnv = process.env.NODE_ENV;
const isDev = nodeEnv === 'dev';
const isProd = nodeEnv === 'prod';

export const ormClientOptions = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  
  useFactory: (configService: ConfigService) => {
    //console.log(configService)
    return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    
    synchronize: !isProd,
    logging: isDev,
    entities: [User, BotUser, Verification],
  }},
  inject: [ConfigService]
});