import { Metadata } from '@grpc/grpc-js';
import { Body, Controller, UsePipes } from '@nestjs/common';
import * as Contracts from 'contracts';
import { Observable, asyncScheduler, scheduled } from 'rxjs';
import { ExchangeOrdersService } from './orders.service';
import { ExchangeOrder } from 'orm';
import { ParseBigIntsPipe } from './orders.pipe';

@Controller()
@Contracts.ExchangeServiceControllerMethods()
export class ExchangeOrdersController implements Contracts.ExchangeServiceController {
  constructor(private readonly orderService: ExchangeOrdersService) {}
  
  @UsePipes(new ParseBigIntsPipe())
  createOrder(
    @Body() request: Contracts.CreateOrderRequest,
    metadata?: Metadata,
  ): Observable<Contracts.CreateOrderResponse> {
    console.log({ request });
    console.log({ metadata });
    return scheduled(this.orderService.createOrder(request), asyncScheduler);
  }
}
