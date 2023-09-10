import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthConfigService } from './auth-config.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AuthService,
    AuthConfigService,
  ],
  imports: [UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
