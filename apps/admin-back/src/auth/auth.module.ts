import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthConfigService } from './auth-config.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, AuthConfigService],
  imports: [UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
