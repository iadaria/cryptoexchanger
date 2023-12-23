import { NestFactory } from '@nestjs/core';
import { ExchangeModule } from './exchange.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcExchangeClientOptions } from 'contracts';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log({ pid: process?.pid });
  const app = await NestFactory.create(ExchangeModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  //
  const microPort = config.get<string>('MICRO_PORT_EXCHANGE');
  console.log({ microPort });
  const clientOptions = grpcExchangeClientOptions(microPort);
  app.connectMicroservice<MicroserviceOptions>(clientOptions, {
    inheritAppConfig: true,
  });
  await app.startAllMicroservices();
}
bootstrap();
