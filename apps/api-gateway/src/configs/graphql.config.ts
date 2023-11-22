import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export const getGraphQLConfig = (): ApolloDriverConfig => ({
  driver: ApolloDriver,
  autoSchemaFile: true,
  playground: true,
  context: ({ req, connection }) => {
    //console.log(req ? req.headers['x-jwt'] : connection.context['X-JWT'])
    return {
      token: req ? req.headers['x-jwt'] : connection.context['X-JWT'],
    };
  },
});
