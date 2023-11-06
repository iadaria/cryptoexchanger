import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { MenuMainScene } from './scenes/menu-main.scene';
import { UsersModule } from 'src/users/users.module';
import { UpdatesModule } from 'src/updates/updates.module';

@Module({
  imports: [UsersModule, UpdatesModule],
  providers: [BotService, BotUpdate, MenuMainScene],
})
export class BotModule {}
