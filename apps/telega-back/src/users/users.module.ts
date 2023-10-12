import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Tg } from 'orm';

@Module({
  imports: [TypeOrmModule.forFeature([Tg.User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
