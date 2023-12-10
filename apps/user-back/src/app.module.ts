import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TronModule } from './tron/tron.module';
import { ConfigModule } from '@nestjs/config';
import * as config from 'src/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TronProvider } from './tron/tron.provider';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TronModule,
    ConfigModule.forRoot(config.getEnvConfig()),
    TypeOrmModule.forRootAsync(config.ormClientOptions()),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
