import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

import { UsersController } from './users.controller';
import { GoogleUser, User, Verification } from 'interfaces';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification, GoogleUser])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
