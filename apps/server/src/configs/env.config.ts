import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

import { validate } from './env.validation';

export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEV = NODE_ENV === 'dev';
export const IS_PROD = NODE_ENV === 'prod';

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

export const GOOGLE_USER_INFO_URL =
  process.env.GOOGLE_USER_INFO_URL || 'https://www.googleapis.com/oauth2/v1/userinfo';

export const getEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  envFilePath: IS_DEV ? '.env.dev' : '.env.test',
  ignoreEnvFile: IS_PROD,
  validate,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'prod', 'test'),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    TELEGRAM_TOKEN: Joi.string().required(),
    CHAT_ID: Joi.string().required(),
    PORT: Joi.string().required(),
  }),
});
