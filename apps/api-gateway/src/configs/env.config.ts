import { ConfigModuleOptions } from '@nestjs/config';

import { validate } from './env.validation';

export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEV = NODE_ENV === 'dev';
export const IS_PROD = NODE_ENV === 'prod';

export const getEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  envFilePath: IS_DEV ? '.env.dev' : '.env.test',
  ignoreEnvFile: IS_PROD,
  validate,
});
