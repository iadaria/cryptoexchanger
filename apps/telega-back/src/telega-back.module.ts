import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import * as configs from 'src/configs';
import { UpdatesModule } from './updates/updates.module';

@Module({
  imports: [
    ConfigModule.forRoot(configs.getEnvConfig()),
    TelegrafModule.forRootAsync(configs.telegramAsyncOptions()),
    TypeOrmModule.forRootAsync(configs.ormClientOptions()),
    UsersModule,
    BotModule,
    UpdatesModule,
  ],
  providers: [],
})
export class TelegaBackModule {}
