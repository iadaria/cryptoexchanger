import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { UsersResolver } from './users/users.resolver';
import { AuthResolver } from './auth/auth.resolver';
import { JwtModule } from './jwt/jwt.module';
import * as configs from './configs';
import { UpdatesResolver } from './telega/updates/updates.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(configs.getEnvConfig()),
    ClientsModule.registerAsync(configs.grpcClientConfigAsync()),
    GraphQLModule.forRoot(configs.getGraphQLConfig()),
    JwtModule.forRoot({ privateKey: process.env.PRIVATE_KEY }),
  ],
  //providers: [],
  providers: [AuthResolver, UsersResolver, UpdatesResolver],
})
export class ApiGatewayModule {}
