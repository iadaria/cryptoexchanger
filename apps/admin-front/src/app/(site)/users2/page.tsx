import { UserTable } from "@/components/UserTable";
import { fetchAllUsersFx } from "@/store/users";

export default async function UsersTwoPage() {
  //const users: User[] = [{ email: "1", role: "1", verified: true }];
  const users = await fetchAllUsersFx();
  return (
    <section className="h-screen">
      <section className="h-screen">
        <div className="flex flex-row">
          <div className="basis-4/5 m-3">
            <UserTable users={users} />
          </div>
        </div>
      </section>
    </section>
  );
}
