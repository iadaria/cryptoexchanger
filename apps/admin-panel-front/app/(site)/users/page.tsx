import { UserTable } from '@/components/UserTable';

export default async function UsersPage() {
  const users = [];

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
