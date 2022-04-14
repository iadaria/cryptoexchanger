import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Verification } from './users/entities/verification.entity';
//import { TelegramModule } from './telegram/telegram.module';
//import { getTelegramConfig } from './configs/telegram.config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { TelegramBotName } from './bot/bot.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        TELEGRAM_TOKEN: Joi.string().required(),
        CHAT_ID: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV === 'dev',
      entities: [User, Verification],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        return {
          token: req ? req.headers['x-jwt'] : connection.context['X-JWT'],
        }
      }
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    CommonModule,
    UsersModule,
    AuthModule,
    // telegram
   /*  TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig
    }), */
    TelegrafModule.forRoot({
      botName: TelegramBotName,
      token: process.env.TELEGRAM_TOKEN,
      include: [BotModule],
    }),
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
