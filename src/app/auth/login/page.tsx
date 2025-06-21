'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Logging in...');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        const data = await res.json();

        if(res.ok){
            setMessage('Login successful');
            console.log(data.role);
            if (data.role === 'admin') {
                console.log("RUN ADMIN");
                router.push('/admin');
            } else {
                console.log("RUN USER");
                router.push('/dashboard');
            }
        }else{
            setMessage(data.error || 'Login failed');
        }
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
