import { ConfigModuleOptions } from "@nestjs/config";
import { validate } from "./envs.validation";
import { IS_DEV, IS_PROD } from "./envs.get";

console.log('$envs.config.ts', { IS_DEV, IS_PROD});

export const getEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  envFilePath: IS_DEV ? '.env.dev' : '.env.test',
  ignoreEnvFile: IS_PROD,
  validate,
});
