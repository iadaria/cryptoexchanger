import { User } from '@/__generated__/graphql';
import { Menu } from '@/components/Menu';
import { ALL_USERS_QUERY } from '@/graphql/queries';
import { useQuery } from '@apollo/client';

interface UsersProps {
  users?: User[] | null;
}

const Users = ({ users }: UsersProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>email</th>
            <th>role</th>
            <th>verified</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(({ email, role, verified}, index) => (
            <tr key={`item-${index}`}>
              <th>{index}</th>
              <td>{email}</td>
              <td>{role}</td>
              <td>{verified ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function UsersPage() {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  const users = data?.allUsers.users;

  return (
    <section className="h-screen">
      <div className="flex flex-row">
        <div className="basis-1/5 m-3">
          <Menu />
        </div>
        <div className="basis-4/5 m-3">
          <Users users={users} />
        </div>
      </div>
    </section>
  );
}
