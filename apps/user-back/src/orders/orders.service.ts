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
      ip: '', //TO DO Find out how to get the ip of user
      expireAt: new Date(), // TO DO how much time I shoud get to user
    };
  }
ß
  async createOrder(order: Contracts.CreateOrderRequest) {
    const newOrder = this.orders.create(this.transform(order));
  }

}
