import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { MenuMainScene } from './scenes/menu-main.scene';

@Module({
  imports: [BotModule],
  providers: [BotService, BotUpdate, MenuMainScene],
})
export class BotModule {}
