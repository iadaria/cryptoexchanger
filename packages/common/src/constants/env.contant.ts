import { Environment } from "../types";

export const EnvironmentFile = {
  [Environment.Production]: ".env.prod",
  [Environment.Development]: ".env.dev",
  [Environment.Test]: ".env.test",
};
