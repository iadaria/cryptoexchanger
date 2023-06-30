import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthConfigService } from './authConfig.service';

@Module({
  imports: [UsersModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AuthService,
    AuthResolver,
    AuthConfigService,
  ],
})
export class AuthModule {}
