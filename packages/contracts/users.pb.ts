/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./common.pb";

export const protobufPackage = "cb.users";

export interface FindUserRequest {
  userId: number;
}

export interface UserData {
  id: number;
  verified: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
  authWay: string;
}

export interface FindUserResponse {
  user?: UserData | undefined;
}

export interface EditProfileRequest {
  email: string;
  password: string;
}

export interface EditProfileResponse {
  error?: string | undefined;
  ok: boolean;
}

export interface GetAllUsersResponse {
  users: UserData[];
}

export const CB_USERS_PACKAGE_NAME = "cb.users";

export interface UsersServiceClient {
  findUser(request: FindUserRequest, metadata?: Metadata): Observable<FindUserResponse>;

  editProfile(request: EditProfileRequest, metadata?: Metadata): Observable<EditProfileResponse>;

  getAllUsers(request: Empty, metadata?: Metadata): Observable<GetAllUsersResponse>;
}

export interface UsersServiceController {
  findUser(request: FindUserRequest, metadata?: Metadata): Observable<FindUserResponse>;

  editProfile(request: EditProfileRequest, metadata?: Metadata): Observable<EditProfileResponse>;

  getAllUsers(request: Empty, metadata?: Metadata): Observable<GetAllUsersResponse>;
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
