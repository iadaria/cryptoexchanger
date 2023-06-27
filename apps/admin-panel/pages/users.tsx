import { Menu } from "@/components/Menu";

export default function UsersPage() {
  return (
    <section className="h-screen">
      <div className="flex flex-row">
        <div className="basis-1/5 m-3">
          <Menu />
        </div>
        <div className="basis-4/5 m-3">right</div>
      </div>
    </section>
  );
}
