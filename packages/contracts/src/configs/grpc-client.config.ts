import { ClientOptions, Transport } from "@nestjs/microservices";
import { GrpcPackage } from "../constants";
import { join } from "path";

export const grpcAdminClientOptions = (url: string): ClientOptions => {
  return {
    transport: Transport.GRPC,
    options: {
      package: GrpcPackage.AUTH,
      protoPath: join(__dirname, "../proto/auth.proto"),
      url,
    },
  };
};
