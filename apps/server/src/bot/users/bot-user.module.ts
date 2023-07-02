import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BotUsersService } from "./bot-users.service";
import { BotUser } from "./entities/bot-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BotUser])],
  providers: [BotUsersService],
  exports: [BotUsersService]
})

export class BotUsersModule {}