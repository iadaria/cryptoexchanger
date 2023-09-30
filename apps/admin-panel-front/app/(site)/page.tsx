import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'admin-panel',
};

export default function Home() {
  console.log({ pid: process?.pid });

  //const href = useGetGoogleAuthUrlQuery();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    let win;
    const _href = href?.data?.getGoogleAuthURL;
    if (_href) {
      console.log({ _href });

      win = window.open(
        _href,
        '_blank',
        'location=yes,height=570,width=520,scrollbars=yes,status=yes'
      );
    }
  }
  return (
    <main className="min-h-screen items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        {/* <div>{isLoggedIn ? "You are logged in" : "You need to log in"}</div> */}
        <br />
        <Link href="/login">Login</Link>
        <br />
        <br />
        <Link href="/register">Register</Link>
        <br />
        <br />
        <Link href="/about">About</Link>
        <br />
        <br />
        {/* <a onClick={handleClick}>Google auth</a> */}
      </div>
    </main>
  );
}
