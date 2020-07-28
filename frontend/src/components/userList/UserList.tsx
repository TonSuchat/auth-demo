import React from "react";

type UserListType = {
  users: {
    id: string;
    email: string;
    role: string;
  }[];
};

const UserList: React.FC<UserListType> = ({ users }) => {
  return (
    <div className="container">
      <table className="table is-striped is-bordered is-fullwidth">
        <thead>
          <tr>
            <th>
              <abbr title="Email">Email</abbr>
            </th>
            <th>
              <abbr title="Role">Role</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) =>
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
