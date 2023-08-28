import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AdminModule } from './admin-back.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcAdminClientOptions } from 'contracts';

async function bootstrap() {
  console.log({ pid: process?.pid });
  const app = await NestFactory.create(AdminModule);
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
  // logger
  const loggerContext = config.get('LOGGER_CONTEXT');
  const logger = new Logger(loggerContext);
  app.useLogger(logger);
  // microservice
  app.connectMicroservice<MicroserviceOptions>(grpcAdminClientOptions);
  await app.startAllMicroservices();
  // port
  const port = config.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
