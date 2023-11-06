import { ALL_USERS_QUERY_FETCH as query } from "@/graphql/queries";
import { $users, fetchAllUsersFx } from "./index";
import { ENVS } from "@/config/envs.get";
import { log, logline } from "@/utils/debug";

$users.on(
  fetchAllUsersFx.doneData.map((result) => result?.data?.allUsers?.users || []),
  (_, users) => {
    console.log("$users", users);
    return users;
  }
);

fetchAllUsersFx.use(async () => {
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  console.log("!!! request");
  console.log("****", "query", query);

  const res = await fetch(ENVS.clientBaseUrl, {
    method,
    headers,
    body: JSON.stringify({ query }),
    cache: "no-cache",
  });
  return res.json();
  //console.log({ result });
  /*   if (result.errors) {
    throw result.errors;
  }
 */
  //return result;
});

fetchAllUsersFx.failData.watch((errorData) =>
  console.log("[fetch]", errorData)
);

fetchAllUsersFx.doneData.watch((fetchUsersResult) =>
  log("[fetchUsers]", fetchUsersResult)
);
