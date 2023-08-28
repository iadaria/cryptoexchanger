import { Module } from '@nestjs/common';
import { Environment } from 'common';
import { AuthResolver } from './auth/auth.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientConfig } from './configs/grpc.config';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('IS_DEV', process.env.NODE_ENV === Environment.Development);

@Module({
  imports: [ClientsModule.register(grpcClientConfig())],
  providers: [AuthResolver],
})
export class ApiGatewayModule {}
