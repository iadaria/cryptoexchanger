import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeOrder } from 'orm';
import { Repository } from 'typeorm';
import * as Contracts from 'contracts';
import { ExchangeStatus, getBank, getCoin, getExchangeStatus, getExchangeType, getFiat, getNetwork } from 'common';

// HOW TO DO AML checking

@Injectable()
export class ExchangeOrdersService {
  constructor(
    @InjectRepository(ExchangeOrder) private readonly orders: Repository<ExchangeOrder>,
  ) {}
  private transform(order: Contracts.CreateOrderRequest): Partial<ExchangeOrder> {
    return {...order,
      type: getExchangeType(order.type),
      status: getExchangeStatus(ExchangeStatus.Done),
      coin: getCoin(order.coin),
      net: getNetwork(order.net),
      bank: getBank(order.bank),
      fiat: getFiat(order.fiat),
      rate: BigInt(order.rate),
      fee: BigInt(order.fee),
      amount: BigInt(order.amount),
      expireAt: new Date(),
      approvedAt: new Date(),
      updatedStatusAt: new Date(),
      targetOrderId: undefined,
      toAddress: '...',
      ip: '', //TO DO Find out how to get the ip of user
    };
  }
  
  async createOrder(orderIncoming: Contracts.CreateOrderRequest): Promise<Contracts.CreateOrderResponse> {
    const newOrder = await this.orders.create(this.transform(orderIncoming));
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
