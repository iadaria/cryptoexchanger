import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Verification } from './entities/verification.entity';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { BotUser } from './entities/bot-user.entity';
import { BotUsersService } from './bot-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, BotUser, Verification])],
  providers: [UsersService, UsersResolver, BotUsersService],
  exports: [UsersService],
})
export class UsersModule {}
