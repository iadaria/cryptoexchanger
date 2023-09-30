"use client";
import { UserTable } from "@/components/UserTable";
import { $users } from "@/store/users";
import { useStore } from "effector-react";

export function Users() {
  const users = useStore($users);

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
