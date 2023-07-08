import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { MenuMainScene } from './scenes/menu-main.scene';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [BotService, BotUpdate, MenuMainScene],
})
export class BotModule {}
