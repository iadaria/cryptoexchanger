import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Environment } from 'common';
import { Chat, Message, Update, TgUser } from 'orm';
import { DataSource } from 'typeorm';

export const ormClientOptions = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],

  useFactory: (configService: ConfigService) => {
    const IS_PROD = configService.get('NODE_ENV') === Environment.Production;
    const IS_DEV = configService.get('NODE_ENV') === Environment.Development;
    console.log(configService.get('DB_CONNECTION'));
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

export default new DataSource({
  type: 'postgres',
  url: 'postgres://daria:12345@127.0.0.1:5432/crypto-telega',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/*.migration.{js,ts}'],
});
