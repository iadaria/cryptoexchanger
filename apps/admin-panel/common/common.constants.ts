export const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

export const LOCALSTORAGE_TOKEN = 'cryptoexchange-token';

export const ENVS = {
	clientBaseUrl: process.env['CLIENT_BASE_URL'],
	webSocketApiUrl: process.env['WEBSOCKET_API_URL'],
	browserApiEndpoint: process.env['BROWSER_API_ENDPOINT'],
	clientDomain: process.env['CLIENT_DOMAIN'],
	nodeEnv: process.env['NODE_ENV'],
  graphqlUrl: process.env['GRAPHQL_URL'],
};
