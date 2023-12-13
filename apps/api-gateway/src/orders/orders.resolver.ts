import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import * as Contract from 'contracts';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { firstValueFrom } from 'rxjs';
import { ExchangeStatus, getExchangeStatus } from 'common';

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
  async createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    const response = await firstValueFrom(
      this.orderService.createOrder(createOrderInput),
    );
    return { ...response, status: getExchangeStatus(response.status) };
  }

  /*   @ResolveField('status', () => ExchangeStatus)
  public resolveStatus(value: string): ExchangeStatus {
    return getExchangeStatus(value);
  } */
}
