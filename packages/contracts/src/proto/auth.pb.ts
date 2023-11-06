/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Empty } from "./common.pb";

export enum Role {
  Client = 0,
  Assistant = 1,
  Admin = 2,
  UNRECOGNIZED = -1,
}

export interface LoginRequest {
  password: string;
  email: string;
}

export interface LoginResponse {
  token?: string | undefined;
}

export interface GoogleAuthURLResponse {
  url: string;
}

export interface GoogleAuthRequest {
  code: string;
}

export interface GoogleAuthResponse {
  token?: string | undefined;
}

export interface CreateAccountRequest {
  email: string;
  /** todo role */
  password: string;
}

export interface CreateAccountResponse {
}

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
}

export interface Profile {
  email: string;
  password: string;
}

export interface EditProfileRequest {
  userId: number;
}

export interface EditProfileResponse {
}

export interface GetAllUsersResponse {
  users: User[];
}

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface AuthServiceClient {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  createAccount(request: CreateAccountRequest, metadata?: Metadata): Observable<CreateAccountResponse>;

  getGoogleAuthUrl(request: Empty, metadata?: Metadata): Observable<GoogleAuthURLResponse>;

  googleAuth(request: GoogleAuthRequest, metadata?: Metadata): Observable<GoogleAuthResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  createAccount(
    request: CreateAccountRequest,
    metadata?: Metadata,
  ): Promise<CreateAccountResponse> | Observable<CreateAccountResponse> | CreateAccountResponse;

  getGoogleAuthUrl(
    request: Empty,
    metadata?: Metadata,
  ): Promise<GoogleAuthURLResponse> | Observable<GoogleAuthURLResponse> | GoogleAuthURLResponse;

  googleAuth(
    request: GoogleAuthRequest,
    metadata?: Metadata,
  ): Promise<GoogleAuthResponse> | Observable<GoogleAuthResponse> | GoogleAuthResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "createAccount", "getGoogleAuthUrl", "googleAuth"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";

export interface UsersServiceClient {
  findUser(request: FindUserRequest, metadata?: Metadata): Observable<FindUserResponse>;

  editProfile(request: EditProfileRequest, metadata?: Metadata): Observable<Empty>;

  getAllUsers(request: Empty, metadata?: Metadata): Observable<GetAllUsersResponse>;
}

export interface UsersServiceController {
  findUser(
    request: FindUserRequest,
    metadata?: Metadata,
  ): Promise<FindUserResponse> | Observable<FindUserResponse> | FindUserResponse;

  editProfile(request: EditProfileRequest, metadata?: Metadata): Promise<Empty> | Observable<Empty> | Empty;

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
