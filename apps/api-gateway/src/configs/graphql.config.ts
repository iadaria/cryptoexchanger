import { GqlModuleOptions } from "@nestjs/graphql";
import { ApolloDriver } from '@nestjs/apollo';


export const getGraphQLConfig = (): GqlModuleOptions => ({
	driver: ApolloDriver,
	autoSchemaFile: true,
	context: ({ req, connection }) => {
		//console.log(req ? req.headers['x-jwt'] : connection.context['X-JWT'])
		return {
			token: req ? req.headers['x-jwt'] : connection.context['X-JWT'],
		};
	},
})