import { Module } from '@nestjs/common';
import { Environment } from 'common';
import { AuthResolver } from './auth/auth.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import * as configs from './configs';
import { ConfigModule } from '@nestjs/config';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('IS_DEV', process.env.NODE_ENV === Environment.Development);

@Module({
  imports: [
    ConfigModule.forRoot(configs.getEnvConfig()),
    ClientsModule.registerAsync(configs.grpcClientConfigAsync()),
    GraphQLModule.forRoot(configs.getGraphQLConfig()),
  ],
  providers: [AuthResolver],
})
export class ApiGatewayModule {}
