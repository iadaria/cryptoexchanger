import Link from 'next/link';

export function Menu() {
  return (
    <ul className="menu bg-base-200 w-56 rounded-box">
      <li>
        <Link href="/users">Users</Link>
      </li>
      <li>
        <Link href="/bot-users">Bot users</Link>
      </li>
      <li>
        <a>Inputs</a>
      </li>
    </ul>
  );
}
