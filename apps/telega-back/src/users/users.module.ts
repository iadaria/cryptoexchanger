import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Telega } from 'orm';

@Module({
  imports: [TypeOrmModule.forFeature([Telega.User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
