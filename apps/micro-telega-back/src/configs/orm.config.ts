import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Env } from "src/common/types/env.types";
import { User } from "src/users/entities/user.entity";

export const ormClientOptions = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  
  useFactory: (configService: ConfigService) => {
    const IS_PROD = configService.get('NODE_ENV') === Env.Production;
    const IS_DEV = configService.get('NODE_ENV') === Env.Developer;

    return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    synchronize: !IS_PROD,
    logging: IS_DEV,
    entities: [User],
  }},
  inject: [ConfigService]
});