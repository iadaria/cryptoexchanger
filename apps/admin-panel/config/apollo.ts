import { ENVS, LOCALSTORAGE_TOKEN } from "@/common/common.constants";
import { ApolloClient, InMemoryCache, createHttpLink, makeVar } from "@apollo/client";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({ uri: ENVS.graphqlUrl });

//const authLink = setContext({});

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network'},
  }
});