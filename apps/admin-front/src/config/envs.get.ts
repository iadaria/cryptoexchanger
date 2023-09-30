export const IS_DEV = process.env["NODE_ENV"] === "development";
export const IS_PROD = process.env["NODE_ENV"] === "production";

export const ENVS = {
  clientBaseUrl: process.env["CLIENT_BASE_URL"] || "localhost:4000/graphql",
  webSocketApiUrl: process.env["WEBSOCKET_API_URL"],
  browserApiEndpoint: process.env["BROWSER_API_ENDPOINT"],
  nodeEnv: process.env["NODE_ENV"],
  graphqlUrl: process.env["NEXT_PUBLIC_GRAPHQL_URL"],
  clientDomain: process.env["NEXT_PUBLIC_CLIENT_DOMAIN"],
};
