import { ConfigModuleOptions } from '@nestjs/config';
import { validate } from './env.validation';
import { IS_DEV, IS_PROD } from 'common';

export const getEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  envFilePath: IS_DEV ? '.env.dev' : '.env.test',
  ignoreEnvFile: IS_PROD,
  validate,
});
