import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <Link href="/users">Users</Link>
      </div>
    </main>
  );
}
