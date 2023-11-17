import { UserTable } from "@/components/UserTable";
import { fetchAllUsersFx } from "@/store/users";

export default async function UsersTwoPage() {
  console.log("Hi there");
  //const { data, errors } = await fetchAllUsersFx();
  //const show = errors?.map((error) => error.message + "\n");
  //const users = data?.allUsers?.users || [];
  const users: any[] = [];
  const show = true;

  return (
    <section className="h-screen">
      <section className="h-screen">
        <div className="flex flex-row">
          <div className="basis-4/5 m-3">
            <p>{show}</p>
            <UserTable users={users} />
          </div>
        </div>
      </section>
    </section>
  );
}
