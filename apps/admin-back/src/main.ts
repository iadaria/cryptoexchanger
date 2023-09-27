import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AdminModule } from './admin-back.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcAdminClientOptions } from 'contracts';
import { PinoLogger } from './logger/pino-logger.service';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from './logger/logger.constants';

// https://www.youtube.com/watch?v=_c1OLRG-t2o

async function bootstrap() {
  console.log({ pid: process?.pid });
  const app = await NestFactory.create(AdminModule /* { bufferLogs: true } */);
  const config = app.get(ConfigService);
  // validation
  app.useGlobalPipes(new ValidationPipe());
  // logger
  app.use((req, res, next) => {
    const asyncStorage = app.get(ASYNC_STORAGE);
    next();
  });
  app.useLogger(app.get(PinoLogger));
  // microservice
  const microAdminPort = config.get<string>('PORT');
  console.log({ microAdminPort });
  const clientOptions = grpcAdminClientOptions(microAdminPort);
  app.connectMicroservice<MicroserviceOptions>(clientOptions, {
    inheritAppConfig: true,
  });
  await app.startAllMicroservices();
}

bootstrap();
