import { CB_AUTH_PACKAGE_NAME } from "../proto";

export enum GrpcClient {
  AUTH = "AuthRpcClient",
  ADMIN = "AdminRpcClient",
}

export enum GrpcPackage {
  AUTH = "cb.auth",
}
