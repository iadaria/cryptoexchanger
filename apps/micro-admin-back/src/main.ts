import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log({ pid: process?.pid });
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  // graphql
  const origin = config.get('CORS_ORIGIN');
  app.enableCors({
    origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, x-jwt',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  // port
  const port = config.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
