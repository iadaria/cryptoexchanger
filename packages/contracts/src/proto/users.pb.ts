/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Empty } from "./common.pb";

export interface FindUserRequest {
  userId: number;
}

export interface User {
  id: number;
  verified: boolean;
  email: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface FindUserResponse {
  user?: User | undefined;
  error?: string | undefined;
  ok: boolean;
}

export interface Profile {
  email: string;
  password: string;
}

export interface EditProfileRequest {
  userId: number;
}

export interface EditProfileResponse {
  error?: string | undefined;
  ok: boolean;
}

export interface GetAllUsersResponse {
  users: User[];
  error?: string | undefined;
  ok: boolean;
}

export const CB_USERS_PACKAGE_NAME = "cb.users";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface UsersServiceClient {
  findUser(request: FindUserRequest, metadata?: Metadata): Observable<FindUserResponse>;

  editProfile(request: EditProfileRequest, metadata?: Metadata): Observable<EditProfileResponse>;

  getAllUsers(request: Empty, metadata?: Metadata): Observable<GetAllUsersResponse>;
}

export interface UsersServiceController {
  findUser(
    request: FindUserRequest,
    metadata?: Metadata,
  ): Promise<FindUserResponse> | Observable<FindUserResponse> | FindUserResponse;

  editProfile(
    request: EditProfileRequest,
    metadata?: Metadata,
  ): Promise<EditProfileResponse> | Observable<EditProfileResponse> | EditProfileResponse;

  getAllUsers(
    request: Empty,
    metadata?: Metadata,
  ): Promise<GetAllUsersResponse> | Observable<GetAllUsersResponse> | GetAllUsersResponse;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findUser", "editProfile", "getAllUsers"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
