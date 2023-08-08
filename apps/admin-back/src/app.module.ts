import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as configs from 'src/configs';
import { JwtModule } from './jwt/jwt.module';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(configs.getEnvConfig()),
    TypeOrmModule.forRootAsync(configs.ormClientOptions()),
    JwtModule.forRoot({ privateKey: process.env.PRIVATE_KEY }), // TOOD get out to the configs
    GraphQLModule.forRoot(configs.getGraphQLConfig()),
    CommonModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
