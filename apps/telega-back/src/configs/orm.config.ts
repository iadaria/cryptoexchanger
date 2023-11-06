import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Environment } from 'common';
import { Chat, Message, Update, TgUser } from 'orm';

export const ormClientOptions = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],

  useFactory: (configService: ConfigService) => {
    const IS_PROD = configService.get('NODE_ENV') === Environment.Production;
    const IS_DEV = configService.get('NODE_ENV') === Environment.Development;

    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      synchronize: !IS_PROD,
      logging: IS_DEV,
      entities: [TgUser, Message, Update, Chat],
    };
  },
  inject: [ConfigService],
});
