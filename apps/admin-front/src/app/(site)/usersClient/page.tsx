import { Users } from "./ components/Users";

export default async function UsersClientPage() {
  return (
    <section className="h-screen">
      <section className="h-screen">
        <div className="flex flex-row">
          <div className="basis-4/5 m-3">
            <Users />
          </div>
        </div>
      </section>
    </section>
  );
}
