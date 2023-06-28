'use client';
import { Inter } from 'next/font/google'
import { Button } from 'shared-ui'
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import { authTokenVar, isLoggedInVar } from '@/config/apollo';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  console.log({ pid: process?.pid});
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log({ isLoggedIn, token: authTokenVar() })
  return (
    <main className="min-h-screen items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div>{isLoggedIn ? "You are logged in" : "You need to log in"}</div>
        <br />
        <Link href="/login">
          Login
        </Link>
        <br></br>
        <br></br>
        <Link href="/register">
          Register
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
