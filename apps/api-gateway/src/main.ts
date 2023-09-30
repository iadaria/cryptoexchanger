import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const config = app.get(ConfigService);
  // validation
  app.useGlobalPipes(new ValidationPipe());
  // graphql
  const origin = config.get('CORS_ORIGIN');
  app.enableCors({
    origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, x-jwt',
    credentials: true,
  });
  // logger
  const loggerContext = config.get('LOGGER_CONTEXT');
  const logger = new Logger(loggerContext);
  app.useLogger(logger);
  // port
  const port = config.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
