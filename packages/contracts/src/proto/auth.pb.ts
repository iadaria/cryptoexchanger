/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
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

export interface Output {
  ok: boolean;
  error?: string | undefined;
}

export interface LoginResponse {
  token?: string | undefined;
  ok: boolean;
  error?: string | undefined;
}

export interface GoogleAuthURLResponse {
  url: string;
}

export interface GoogleAuthRequest {
  code: string;
}

export interface GoogleAuthResponse {
  token?: string | undefined;
  ok: boolean;
  error?: string | undefined;
}

export interface CreateAccountRequest {
  email: string;
  /** todo role */
  password: string;
}

export interface CreateAccountResponse {
  error?: string | undefined;
  ok: boolean;
}

export const CB_AUTH_PACKAGE_NAME = "cb.auth";

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
