import { EnvironmentFile } from "../constants/env.contant";
import { Environment, getMode, isEnvironment } from "../types";

export const NODE_ENV = process.env.NODE_ENV;

export const IS_DEV = NODE_ENV === Environment.Development;
export const IS_PROD = NODE_ENV === Environment.Production;

export const getEnvironmentFileName = () => {
  const mode = NODE_ENV && getMode(NODE_ENV);
  if (!mode) throw new Error("The 'env.' file is wrong!");

  return EnvironmentFile[mode];
};

/* export const PORT = process.env.PORT;
export const MICRO_ADMIN_PORT = process.env.MICRO_ADMIN_PORT; */
