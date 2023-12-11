import { NestFactory } from '@nestjs/core';
import { ExchangeModule } from './exchange.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcExchangeClientOptions } from 'contracts';

async function bootstrap() {
  console.log({ pid: process?.pid });
  const app = await NestFactory.create(ExchangeModule);
  const config = app.get(ConfigService);
  //
  const microPort = config.get<string>('MICRO_PORT_EXCHANGE');
  const clientOptions = grpcExchangeClientOptions(microPort);
  app.connectMicroservice<MicroserviceOptions>(clientOptions, {
    inheritAppConfig: true,
  });
  await app.startAllMicroservices();
}
bootstrap();
