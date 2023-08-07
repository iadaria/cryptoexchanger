type User = {
  email: string;
  role: string;
  verified: boolean;
};

interface UsersProps {
  users?: User[];
}

export const UserTable = ({ users }: UsersProps) => {
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
          {users?.map(({ email, role, verified }, index) => (
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
