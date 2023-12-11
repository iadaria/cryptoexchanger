import { Module } from '@nestjs/common';
import { TronModule } from './tron/tron.module';
import { ConfigModule } from '@nestjs/config';
import * as config from 'src/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TronModule,
    ConfigModule.forRoot(config.getEnvConfig()),
    TypeOrmModule.forRootAsync(config.ormClientOptions()),
    OrdersModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class ExchangeModule {}
