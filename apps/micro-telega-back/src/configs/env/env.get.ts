import { Environment } from 'src/common/types/env.types';

export const getNodeEnv = () => process.env.NODE_ENV;

export const IS_DEV = getNodeEnv() === Environment.Developer;
export const IS_PROD = getNodeEnv() === Environment.Production;
