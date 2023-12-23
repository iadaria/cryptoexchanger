import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import * as Contract from 'contracts';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { firstValueFrom } from 'rxjs';
import { getExchangeStatus } from 'common';

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
    return 'hi';
  }

  @Mutation((returns) => CreateOrderOutput)
  async createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    console.log({ createOrderInput });
    const response = await firstValueFrom(
      this.orderService.createOrder(createOrderInput),
    );
    return { ...response, status: getExchangeStatus(response.status) };
    //return firstValueFrom(this.orderService.createOrder(createOrderInput));
  }
}
