import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as configs from 'src/configs';
import { JwtModule } from './jwt/jwt.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(configs.getEnvConfig()),
    TypeOrmModule.forRootAsync(configs.ormClientOptions()),
    JwtModule.forRoot({ privateKey: process.env.PRIVATE_KEY }), // TOOD get out to the configs
    CommonModule,
    AuthModule,
    UsersModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AdminModule {}
