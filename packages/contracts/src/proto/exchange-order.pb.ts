/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export enum ExchangeType {
  SELL = 0,
  BUY = 1,
  UNRECOGNIZED = -1,
}

export enum ExchangeStatus {
  DONE = 0,
  ACTIVE = 1,
  REJECTED = 2,
  TIMEOUT = 3,
  CANCELLED = 4,
  UNRECOGNIZED = -1,
}

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
  type: ExchangeType;
  targetOrderId?: bigint | undefined;
}

export interface CreateOrderResponse {
  id: bigint;
  createdAt: Date | undefined;
  expireAt: Date | undefined;
  toAddress: string;
  amount: bigint;
  status: ExchangeStatus;
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
