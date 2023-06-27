import { ENVS, IS_SERVER, LOCALSTORAGE_TOKEN } from '@/common/common.constants';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

let token;
if (!IS_SERVER) {
  token = localStorage.getItem(LOCALSTORAGE_TOKEN);
}
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({ uri: ENVS.graphqlUrl });

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "x-jwt": authTokenVar() || ""
  }
}));

//const authLink = setContext({});
//const SERVER_API_ENDPOIN = 'http://localhost:3000'

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrMode: IS_SERVER,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            }
          },
          token: {
            read() {
              return authTokenVar();
            }
          }
        }
      }
    }
  }),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
});
