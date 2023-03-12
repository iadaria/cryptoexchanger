import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
import { sessionMiddleware } from './bot/middleware/session.middleware';
import { getEnvConfig } from './configs/env.config';
import { ormClientOptions } from './configs/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvConfig()),
    TypeOrmModule.forRootAsync(ormClientOptions()),
    JwtModule.forRoot({ privateKey: process.env.PRIVATE_KEY}),
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
      middlewares: [sessionMiddleware],
      include: [BotModule],
    }),
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/*  GraphQLModule.forRoot<ApolloDriverConfig>({
   installSubscriptionHandlers: true,
   driver: ApolloDriver,
   autoSchemaFile: true,
   context: ({ req, connection }) => {
     return {
       token: req ? req.headers['x-jwt'] : connection.context['X-JWT'],
     }
   }
 }), */