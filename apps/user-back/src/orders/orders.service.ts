import { Body, Injectable, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeOrder } from 'orm';
import { Repository } from 'typeorm';
import * as Contracts from 'contracts';
import { ExchangeStatus, getBank, getCoin, getExchangeStatus, getExchangeType, getFiat, getNetwork } from 'common';
import { ParseBigIntsPipe } from './orders.pipe';

// HOW TO DO AML checking

@Injectable()
export class ExchangeOrdersService {
  constructor(
    @InjectRepository(ExchangeOrder) private readonly orders: Repository<ExchangeOrder>,
  ) {}
/*   private transform(orderIncoming: Contracts.CreateOrderRequest): Partial<ExchangeOrder> {
    const order = {
      ...orderIncoming,
      expireAt: new Date(),
      approvedAt: new Date(),
      updatedStatusAt: new Date(),
      targetOrderId: undefined,
      toAddress: '...',
      fee: BigInt(orderIncoming.fee),
      amount: BigInt(orderIncoming.amount),
      rate: BigInt(orderIncoming.rate),
      ip: '', //TO DO Find out how to get the ip of user
    }
    return order as ExchangeOrder;
  } */
  

  async createOrder( orderIncoming: Contracts.CreateOrderRequest):
    Promise<Contracts.CreateOrderResponse> {
    //const orderForSaving = this.transform(orderIncoming)
    const newOrder = await this.orders.create(orderIncoming as ExchangeOrder);
    const order  = await this.orders.save(newOrder);
    return {
      id: order.id,
      createdAt: order.createdAt,
      toAddress: '...',
      amount: order.amount,
      status: ExchangeStatus.Active,
      expireAt: new Date(), // TO DO how much time I shoud get to user
    }
  }
}
