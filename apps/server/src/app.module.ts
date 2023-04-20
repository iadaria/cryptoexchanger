import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { BotUsersModule } from './bot/users/bot-user.module';
import { GraphQLModule } from '@nestjs/graphql';
import * as configs from './configs'


@Module({
  imports: [
    ConfigModule.forRoot(configs.getEnvConfig()),
    TypeOrmModule.forRootAsync(configs.ormClientOptions()),
    TelegrafModule.forRoot(configs.telegramConfig()),
    JwtModule.forRoot({ privateKey: process.env.PRIVATE_KEY }),
    GraphQLModule.forRoot(configs.getGraphQLConfig()),
    CommonModule,
    AuthModule,
    UsersModule,
    BotUsersModule,
    BotModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
