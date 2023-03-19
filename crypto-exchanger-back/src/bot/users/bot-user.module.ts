import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { BotUser } from "./entities/bot-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BotUser])],
  providers: [UsersService]
})

export class BotUsersModule {}