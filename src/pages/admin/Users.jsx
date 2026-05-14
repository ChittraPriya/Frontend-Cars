import React from "react";

const Users = () => {
  const users = [
    { id: 1, name: "John", email: "john@mail.com" },
    { id: 2, name: "Sara", email: "sara@mail.com" }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="bg-white p-4 rounded shadow">
        {users.map((user) => (
          <div key={user.id} className="border-b py-2">
            <p>{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;