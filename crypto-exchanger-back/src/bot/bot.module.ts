import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { MenuMainScene } from './scenes/menu-main.scene';
import { BotUsersService } from './users/bot-users.service';
import { BotUser } from './users/entities/bot-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BotUser])],
  providers: [BotService, BotUpdate, MenuMainScene, BotUsersService],
})
export class BotModule {}
