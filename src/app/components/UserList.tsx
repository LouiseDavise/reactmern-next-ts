'use client';
import { useEffect, useState } from 'react';

type User = {
  _id: string;
  username: string;
  age?: number;
  birthday?: string;
  phoneNumber?: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>👤 User List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>{user.username}</strong> - Age: {user.age ?? 'N/A'} - 📞 {user.phoneNumber ?? 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}
