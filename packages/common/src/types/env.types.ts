export enum Environment {
  Production = "production",
  Development = "development",
  Test = "test",
}

export const isEnvironment = (thing?: string) =>
  Object.values(Environment).includes(thing as Environment);

export const getMode = (nodeEnv: string) => {
  const variants = [nodeEnv, nodeEnv?.toLowerCase(), nodeEnv?.toUpperCase()];

  return Object.values(Environment).find((mode) => variants.includes(mode));
};
