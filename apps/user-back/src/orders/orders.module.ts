import { Module } from '@nestjs/common';
import { ExchangeOrdersController } from './orders.controller';
import { ExchangeOrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeOrder } from 'orm';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeOrder])],
  controllers: [ExchangeOrdersController],
  providers: [ExchangeOrdersService],
})
export class OrdersModule {}

