import { NestFactory } from '@nestjs/core';
import { TelegaBackModule } from './telega-back.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log({ pid: process?.pid });
  const app = await NestFactory.create(TelegaBackModule);
  const config = app.get(ConfigService);
  // validation
  app.useGlobalPipes(new ValidationPipe());
  // logger
  const loggerContext = config.get('LOGGER_CONTEXT');
  const logger = new Logger(loggerContext);
  app.useLogger(logger);
  // microservice
  /* const microAdminPort = config.get<string>('PORT');
  console.log({ microAdminPort });
  const clientOptions = grpc */
  const port = config.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
