import { AllUsersOutput, User } from "@/__generated__/graphql";
import { AccountDomain } from "@/store/app";
import { GraphQLError } from "graphql";

export type GqlResult<TData> = {
  data?: TData;
  errors?: GraphQLError[];
};
export const $users = AccountDomain.createStore<User[]>([]);

export const fetchAllUsers = AccountDomain.createEvent();

export const fetchAllUsersFx = AccountDomain.createEffect<
  void,
  GqlResult<{ allUsers?: AllUsersOutput }>
>();
