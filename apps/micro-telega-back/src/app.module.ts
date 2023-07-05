import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BotService } from './bot/bot.service';
import { BotUpdate } from './bot/bot.update';
import { MenuMainScene } from './bot/scenes/menu-main.scene';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import * as configs from 'src/configs';

@Module({
  imports: [
    ConfigModule.forRoot(configs.getEnvConfig()),
    TypeOrmModule.forRootAsync(configs.ormClientOptions()),
    TelegrafModule.forRootAsync(configs.telegramAsyncOptions()),
    UsersModule,
    BotModule,
  ],
  providers: [BotService, BotUpdate, MenuMainScene],
})
export class AppModule {}
