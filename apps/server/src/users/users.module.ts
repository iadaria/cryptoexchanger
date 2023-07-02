import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { GoogleUser } from './entities/google-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification, GoogleUser])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
