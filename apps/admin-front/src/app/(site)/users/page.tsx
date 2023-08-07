import { UserTable } from "@/components/UserTable";
import { ENVS } from "@/config/envs.get";
import { ALL_USERS_QUERY_FETCH as query } from "@/graphql/queries";
import { errorline, log } from "@/utils/debug";

const method = "POST";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function getAllUsers() {
  try {
    const res = await fetch(ENVS.clientBaseUrl, {
      method,
      headers,
      body: JSON.stringify({ query }),
      cache: "no-store",
    });
    const data = await res.json();
    log(data);
    throw Error("hi");
    console.log("***", JSON.stringify(data?.errors, null, 4));
  } catch (error) {
    console.log("***", JSON.stringify(error, null, 4));
  }
  return [];
}

export default async function UsersPage() {
  const users: any[] = await getAllUsers();

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
