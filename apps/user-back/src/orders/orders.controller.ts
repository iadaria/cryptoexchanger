import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import * as Contracts from 'contracts';
import { Observable } from 'rxjs';

@Controller()
@Contracts.ExchangeServiceControllerMethods()
export class ExchangeOrdersController implements Contracts.ExchangeServiceController {
  createOrder(
    request: Contracts.CreateOrderRequest,
    metadata?: Metadata,
  ): Observable<Contracts.CreateOrderResponse> {
    console.log({ request });
    return null;
  }
}
