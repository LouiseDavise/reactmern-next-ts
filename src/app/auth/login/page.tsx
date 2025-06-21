'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(res => {
                const user = res.data;
                if (user?.role === 'admin') router.push('/admin');
                else if (user?.role === 'user') router.push('/dashboard');
            })
            .catch(() => {
                // Not logged in — do nothing
            });
    }, []);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Logging in...');

        axios.post('/api/auth/login', { username, password })
        .then((res) => {
            const data = res.data;
            setMessage('Login successful');

            if (data.role === 'admin') {
                console.log("RUN ADMIN");
                router.push('/admin');
            } else {
                console.log("RUN USER");
                router.push('/dashboard');
            }
        })
        .catch((error) => {
            const errorMsg = error.response?.data?.error || 'Login failed';
            setMessage(errorMsg);
        });
    };
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                Username:
                <input value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <br />
                <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
