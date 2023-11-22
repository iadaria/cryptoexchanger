import { ConfigModuleOptions } from '@nestjs/config';
import { IS_DEV, IS_PROD } from 'common';
//import { validate } from "./envs.validation";

console.log('$envs.config.ts', { IS_DEV, IS_PROD });

export const getEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  envFilePath: IS_DEV ? '.env.dev' : '.env.prod',
  //ignoreEnvFile: IS_PROD,
  //validate,
});
