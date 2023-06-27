import { Menu } from '@/components/Menu';
import { ALL_USERS_QUERY } from '@/graphql/queries';
import { useQuery } from '@apollo/client';

export default function UsersPage() {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  console.log(data?.allUsers);
  console.log({ error })

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
