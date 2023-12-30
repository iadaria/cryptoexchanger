import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeOrder } from 'orm';
import { Repository } from 'typeorm';
import * as Contracts from 'contracts';

// HOW TO DO AML checking

@Injectable()
export class ExchangeOrdersService {
  constructor(
    @InjectRepository(ExchangeOrder) private readonly orders: Repository<ExchangeOrder>,
  ) {}

  async createOrder(order: Contracts.CreateOrderRequest) {
    const newOrder = this.orders.create(order);
  }
}
