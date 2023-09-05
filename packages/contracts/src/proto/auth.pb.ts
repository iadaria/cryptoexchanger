/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

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

export interface Empty {
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

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  getGoogleAuthUrl(request: Empty, metadata?: Metadata): Observable<GoogleAuthURLResponse>;

  googleAuth(request: GoogleAuthRequest, metadata?: Metadata): Observable<GoogleAuthResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  getGoogleAuthUrl(request: Empty, metadata?: Metadata): Observable<GoogleAuthURLResponse>;

  googleAuth(request: GoogleAuthRequest, metadata?: Metadata): Observable<GoogleAuthResponse>;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "getGoogleAuthUrl", "googleAuth"];
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
