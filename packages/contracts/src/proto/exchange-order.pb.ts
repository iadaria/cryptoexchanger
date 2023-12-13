/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export interface CreateOrderRequest {
  amount: bigint;
  bank: string;
  cardNumber: number;
  coin: string;
  email: string;
  fee: bigint;
  fiat: string;
  isAgree?: boolean | undefined;
  net: string;
  rate: bigint;
  type: string;
  targetOrderId?: bigint | undefined;
}

export interface CreateOrderResponse {
  id: bigint;
  createdAt: Date | undefined;
  expireAt: Date | undefined;
  toAddress: string;
  amount: bigint;
  status: string;
}

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface ExchangeServiceClient {
  createOrder(request: CreateOrderRequest, metadata?: Metadata): Observable<CreateOrderResponse>;
}

export interface ExchangeServiceController {
  createOrder(
    request: CreateOrderRequest,
    metadata?: Metadata,
  ): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;
}

export function ExchangeServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ExchangeService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ExchangeService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EXCHANGE_SERVICE_NAME = "ExchangeService";
