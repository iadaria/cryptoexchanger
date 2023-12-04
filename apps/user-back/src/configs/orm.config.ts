import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { IS_DEV, IS_PROD } from 'common';

export const ormClientOptions = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],

  useFactory: (configService: ConfigService) => {
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
      entities: [],
    };
  },
  inject: [ConfigService],
});
