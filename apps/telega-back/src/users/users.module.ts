import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { TgUser } from 'orm';

@Module({
  imports: [TypeOrmModule.forFeature([TgUser])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
