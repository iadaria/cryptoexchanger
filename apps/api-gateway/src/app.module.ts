import { Module } from '@nestjs/common';
import { Environment } from 'common';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('IS_DEV', process.env.NODE_ENV === Environment.Developer);

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
