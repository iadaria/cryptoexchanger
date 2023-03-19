import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { getEnvConfig } from './configs/env.config';
import { ormClientOptions } from './configs/orm.config';
import { telegramConfig } from './configs/telegram.config';


@Module({
  imports: [
    ConfigModule.forRoot(getEnvConfig()),
    TypeOrmModule.forRootAsync(ormClientOptions()),
    TelegrafModule.forRoot(telegramConfig()),
    JwtModule.forRoot({ privateKey: process.env.PRIVATE_KEY }),
    CommonModule,
    UsersModule,
    AuthModule,
    BotModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
/* export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DbMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL});
    //throw new Error('Method not implemented.');
  }
} */
