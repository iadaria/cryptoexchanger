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
  // validation
  app.useGlobalPipes(new ValidationPipe());
  // logger
  const loggerContext = config.get('LOGGER_CONTEXT');
  const logger = new Logger(loggerContext);
  app.useLogger(logger);
  // microservice
  const microAdminPort = config.get<string>('PORT');
  console.log({ microAdminPort });
  const clientOptions = grpcAdminClientOptions(microAdminPort);
  app.connectMicroservice<MicroserviceOptions>(clientOptions);
  await app.startAllMicroservices();
}

bootstrap();
