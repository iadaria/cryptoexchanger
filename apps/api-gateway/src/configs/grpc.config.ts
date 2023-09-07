import { ClientsModuleOptions } from '@nestjs/microservices';
import { GrpcClient } from 'common';
import { grpcAdminClientOptions } from 'contracts';

export const grpcClientConfig = (): ClientsModuleOptions => [
  { name: GrpcClient.AUTH, ...grpcAdminClientOptions },
];
