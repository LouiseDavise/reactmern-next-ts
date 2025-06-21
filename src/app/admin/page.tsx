'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AdminPage() {
    const router = useRouter();

    const handleLogout = async () => {
      await axios.post('/api/auth/logout');
      router.push('/auth/login');
    };

    return (
      <div>
        <h1>Welcome to Admin Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
}
