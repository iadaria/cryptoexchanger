import { Module } from '@nestjs/common';
import { Environment } from 'common';
import { AuthResolver } from './auth/auth.resolver';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('IS_DEV', process.env.NODE_ENV === Environment.Development);

@Module({
  imports: [],
  providers: [AuthResolver],
})
export class AppModule {}
