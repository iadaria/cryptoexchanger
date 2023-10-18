/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Empty } from "./common.pb";

export interface TelegaUser {
  id: number;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  isPremium: boolean;
  lastName?: string | undefined;
  firstName?: string | undefined;
  username?: string | undefined;
}

export interface Message {
  id: number;
  messageId: number;
  from?: TelegaUser | undefined;
  date: Date | undefined;
  text: string;
}

export interface Update {
  id: number;
  updateId: number;
  message?: Message | undefined;
}

export interface GetAllUpdatesResponse {
  updates: Update[];
}

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface UpdatesServiceClient {
  getAllRequests(request: Empty, metadata?: Metadata): Observable<GetAllUpdatesResponse>;
}

export interface UpdatesServiceController {
  getAllRequests(
    request: Empty,
    metadata?: Metadata,
  ): Promise<GetAllUpdatesResponse> | Observable<GetAllUpdatesResponse> | GetAllUpdatesResponse;
}

export function UpdatesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getAllRequests"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UpdatesService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UpdatesService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const UPDATES_SERVICE_NAME = "UpdatesService";
