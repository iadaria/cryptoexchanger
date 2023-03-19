import { Module } from '@nestjs/common';
import { BotUsersService } from 'src/bot/users/bot-users.service';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { MenuMainScene } from './scenes/menu-main.scene';
//import { RandomNumberScene } from './scenes/random-number.scene';

@Module({
  providers: [BotService, BotUpdate, MenuMainScene, BotUsersService],
})
export class BotModule {}
