import { Inter } from 'next/font/google'
import { Button } from 'shared-ui'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  console.log({ pid: process?.pid});
  return (
    <main className="min-h-screen items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <Link href="/login">
          Login
        </Link>
        <br></br>
        <br></br>
        <Link href="/login-server">
          Login Server
        </Link>
        <br></br>
        <br></br>
        <Link href="/about">
          About
        </Link>
      </div>
    </main>
  )
}
