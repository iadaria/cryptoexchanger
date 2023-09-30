import { AllUsersOutput, AllUsersQuery, User } from "@/__generated__/graphql";
import { GraphQLError } from "@/common/types.common";
import { UserTable } from "@/components/UserTable";
import { ENVS } from "@/config/envs.get";
import { ALL_USERS_QUERY_FETCH as query } from "@/graphql/queries";
import { log } from "@/utils/debug";

const method = "POST";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

type Result = {
  data: {
    allUsers: AllUsersOutput;
  };
} & GraphQLError;

async function getAllUsers() {
  try {
    const res = await fetch(ENVS.clientBaseUrl, {
      method,
      headers,
      body: JSON.stringify({ query }),
      cache: "no-store",
    });
    const result: Result = await res.json();
    log(result);
    if (result.errors) {
      throw result.errors;
    }
    return result.data.allUsers.users || [];
  } catch (error) {
    console.log("***", JSON.stringify(error, null, 4));
    return [];
  }
}

export default async function UsersPage() {
  const users: User[] = await getAllUsers();
  log(users);
  return (
    <section className="h-screen">
      <div className="flex flex-row">
        <div className="basis-4/5 m-3">
          <UserTable users={users} />
        </div>
      </div>
    </section>
  );
}
