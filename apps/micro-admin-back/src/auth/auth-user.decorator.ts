import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

export const AuthUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext<{ user?: User}>();
    //console.log(gqlContext)
    //const user = gqlContext('user');
    const user = gqlContext?.user;
    return user;
});