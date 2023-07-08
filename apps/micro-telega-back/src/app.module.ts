import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import * as configs from 'src/configs';

@Module({
  imports: [
    TelegrafModule.forRootAsync(configs.telegramAsyncOptions()),
    ConfigModule.forRoot(configs.getEnvConfig()),
    TypeOrmModule.forRootAsync(configs.ormClientOptions()),
    UsersModule,
    BotModule,
  ],
  providers: [],
})
export class AppModule {}
