import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { BotUsersService } from "./bot-users.service";
import { BotUser } from "./entities/bot-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BotUser])],
  providers: [BotUsersService],
  exports: []
})

export class BotUsersModule {}