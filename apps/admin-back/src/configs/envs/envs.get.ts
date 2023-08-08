import { Environment } from 'common';

export const getNodeEnv = () => process.env.NODE_ENV;

export const IS_DEV = getNodeEnv() === Environment.Development;
export const IS_PROD = getNodeEnv() === Environment.Production;
