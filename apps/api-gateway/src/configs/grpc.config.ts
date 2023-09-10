import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientsModuleOptions,
  ClientsProviderAsyncOptions,
} from '@nestjs/microservices';
import { GrpcClient, grpcAdminClientOptions } from 'contracts';

export const grpcClientConfig = (): ClientsModuleOptions => [
  {
    name: GrpcClient.AUTH,
    ...grpcAdminClientOptions('0.0.0.0:5001'),
  },
];

export const grpcClientConfigAsync = (): ClientsModuleOptions => [
  clientProviderOptions(),
];

export const clientProviderOptions = (): ClientsProviderAsyncOptions => ({
  imports: [ConfigModule],
  name: GrpcClient.AUTH,
  useFactory: (configService: ConfigService) => {
    const authPort = configService.get<string>('MICRO_ADMIN_PORT');
    console.log({ authPort });
    return { name: GrpcClient.AUTH, ...grpcAdminClientOptions(authPort) };
  },
  inject: [ConfigService],
});
