import { ClientsModuleOptions } from '@nestjs/microservices';
import { GrpcClient, grpcAdminClientOptions } from 'contracts';

console.log({ microport: process.env.MICRO_ADMIN_PORT });

export const grpcClientConfig = (): ClientsModuleOptions => [
  {
    name: GrpcClient.AUTH,
    ...grpcAdminClientOptions(process.env.MICRO_ADMIN_PORT),
  },
];
