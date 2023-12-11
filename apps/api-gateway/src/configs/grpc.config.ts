import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientsModuleOptions,
  ClientsProviderAsyncOptions,
} from '@nestjs/microservices';
import {
  GrpcClient,
  grpcAdminClientOptions,
  grpcTelegaClientOptions,
  grpcExchangeClientOptions,
} from 'contracts';

/* export const grpcClientConfig = (): ClientsModuleOptions => [
  {
    name: GrpcClient.AUTH,
    ...grpcAdminClientOptions('0.0.0.0:5001'),
  },
]; */

export const grpcClientConfigAsync = (): ClientsModuleOptions => [
  clientProviderOptions(),
  clientProviderTelegaOptions(),
  clientProviderUserOptions(),
];

export const clientProviderOptions = (): ClientsProviderAsyncOptions => ({
  imports: [ConfigModule],
  name: GrpcClient.AUTH,
  useFactory: (configService: ConfigService) => {
    const authPort = configService.get<string>('MICRO_ADMIN_PORT');
    return { name: GrpcClient.AUTH, ...grpcAdminClientOptions(authPort) };
  },
  inject: [ConfigService],
});

export const clientProviderTelegaOptions = (): ClientsProviderAsyncOptions => ({
  imports: [ConfigModule],
  name: GrpcClient.TELEGA,
  useFactory: (configService: ConfigService) => {
    const telegaPort = configService.get<string>('MICRO_TELEGA_PORT');
    return { name: GrpcClient.TELEGA, ...grpcTelegaClientOptions(telegaPort) };
  },
  inject: [ConfigService],
});

export const clientProviderUserOptions = (): ClientsProviderAsyncOptions => ({
  imports: [ConfigModule],
  name: GrpcClient.EXCHANGE_ORDER,
  useFactory: (configService: ConfigService) => {
    const port = configService.get<string>('MICRO_EXCHANGE_PORT');
    return {
      name: GrpcClient.EXCHANGE_ORDER,
      ...grpcExchangeClientOptions(port),
    };
  },
  inject: [ConfigService],
});
