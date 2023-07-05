import { Env } from "src/common/types/env.types";

export const getNodeEnv = () => process.env.NODE_ENV;

export const IS_DEV = getNodeEnv() === Env.Developer;
export const IS_PROD = getNodeEnv() === Env.Production;