import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import * as Contract from 'contracts';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { firstValueFrom } from 'rxjs';

//@Resolver()
export class OrdersResolver {
  private orderService: Contract.ExchangeServiceClient;

  constructor(
    @Inject(Contract.GrpcClient.EXCHANGE_ORDER) private orders: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderService = this.orders.getService<Contract.ExchangeServiceClient>(
      Contract.EXCHANGE_SERVICE_NAME,
    );
  }

  @Query((returns) => String)
  getNull() {
    return null;
  }

  @Mutation((returns) => Object)
  createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    const response = { ...createOrderInput, type: Contract.ExchangeType.SELL };
    return firstValueFrom(this.orderService.createOrder(response));
  }
}
