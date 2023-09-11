import { CB_AUTH_PACKAGE_NAME, CB_USERS_PACKAGE_NAME } from "../proto";

export enum GrpcClient {
  AUTH = "AuthRpcClient",
  ADMIN = "AdminRpcClient",
}

export enum GrpcPackage {
  AUTH = CB_AUTH_PACKAGE_NAME,
  USERS = CB_USERS_PACKAGE_NAME,
}
