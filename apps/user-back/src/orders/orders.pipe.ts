import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { ExchangeOrder } from "orm";
import * as Contracts from 'contracts';

@Injectable()
export class ParseBigIntsPipe implements PipeTransform<Contracts.CreateOrderRequest,Contracts.CreateOrderRequest> {
    transform(orderIncoming: ExchangeOrder, metadata: ArgumentMetadata) {
        console.log('Pipe', { orderIncoming})
        return  {
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
          };
    }
}
