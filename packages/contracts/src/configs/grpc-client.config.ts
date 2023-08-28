import { ClientOptions, Transport } from "@nestjs/microservices";
import { GrpcPackage } from "../constants";
import { MICRO_ADMIN_PORT } from "../env/grpc.env";
import { join } from "path";

console.log({ MICRO_ADMIN_PORT });

export const grpcAdminClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: GrpcPackage.AUTH,
    protoPath: join(__dirname, "../proto/auth.proto"),
    url: MICRO_ADMIN_PORT,
  },
};
