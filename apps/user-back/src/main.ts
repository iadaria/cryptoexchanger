import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  console.log({ pid: process?.pid });
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  //
  const microAdminPort = config.get<string>('PORT_MICROSERVICE');
  await app.listen(3000);
}
bootstrap();
