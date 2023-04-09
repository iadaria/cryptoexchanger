import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { getEnvConfig } from './configs/env.config';
import { ormClientOptions } from './configs/orm.config';
import { telegramConfig } from './configs/telegram.config';
import { BotUsersModule } from './bot/users/bot-user.module';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvConfig()),
    TypeOrmModule.forRootAsync(ormClientOptions()),
    TelegrafModule.forRoot(telegramConfig()),
    JwtModule.forRoot({ privateKey: process.env.PRIVATE_KEY }),
    CommonModule,
    UsersModule,
    AuthModule,
    BotUsersModule,
    BotModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
