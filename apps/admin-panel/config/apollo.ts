import { ENVS, IS_SERVER, LOCALSTORAGE_TOKEN } from '@/common/common.constants';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from '@apollo/client';

let token;

if (!IS_SERVER) {
  token = localStorage.getItem(LOCALSTORAGE_TOKEN);
}

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);


const httpLink = createHttpLink({ uri: ENVS.graphqlUrl });

//const authLink = setContext({});
//const SERVER_API_ENDPOIN = 'http://localhost:3000'

export const client = new ApolloClient({
  link: httpLink,
  ssrMode: IS_SERVER,
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
});
