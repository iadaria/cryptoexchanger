'use client';
import { apolloClient } from '@/config/apollo';
import { ApolloProvider } from '@apollo/client';

export const ApolloContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
