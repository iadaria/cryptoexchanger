import { UserTable } from "@/components/UserTable";

async function getAllUsers() {
  const res = await fetch();
}

export default async function UsersPage() {
  const users: any[] = [];

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
