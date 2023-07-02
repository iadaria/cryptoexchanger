import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { MenuMainScene } from './scenes/menu-main.scene';
import { BotUsersModule } from './users/bot-user.module';

@Module({
  imports: [BotUsersModule],
  providers: [BotService, BotUpdate, MenuMainScene],
})
export class BotModule {}
