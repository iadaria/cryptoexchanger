import { ENVS } from "@/config/envs.get";
import { ALL_USERS_QUERY_FETCH as query } from "@/graphql/queries";
import { fetchAllUsersFx } from "./index";
import { AllUsersOutput } from "@/__generated__/graphql";
import { GraphQLError } from "@/common/types.common";

type Result = {
  data: {
    allUsers: AllUsersOutput;
  };
} & GraphQLError;

fetchAllUsersFx.use(async () => {
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const res = await fetch(ENVS.clientBaseUrl, {
    method,
    headers,
    body: JSON.stringify({ query }),
    cache: "no-cache",
  });
  const result: Result = await res.json();

  return result.data.allUsers.users || [];
});
