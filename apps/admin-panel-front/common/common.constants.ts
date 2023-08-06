import getConfig from 'next/config';
//const { serverRuntimeConfig } = getConfig();

export const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

export const LOCALSTORAGE_TOKEN = 'cryptoexchange-token';

export const IS_SERVER = typeof window === 'undefined';

//export const { SERVER_API_ENDPOIN } = serverRuntimeConfig;

export const ENVS = {
  clientBaseUrl: process.env['CLIENT_BASE_URL'],
  webSocketApiUrl: process.env['WEBSOCKET_API_URL'],
  browserApiEndpoint: process.env['BROWSER_API_ENDPOINT'],
  nodeEnv: process.env['NODE_ENV'],
  graphqlUrl: process.env['NEXT_PUBLIC_GRAPHQL_URL'],
  clientDomain: process.env['NEXT_PUBLIC_CLIENT_DOMAIN'],
};
