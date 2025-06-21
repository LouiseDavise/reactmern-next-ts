'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function RegisterPage(){
    const router = useRouter();

    const [form, setForm] = useState({
        username: '',
        password: '',
        age: '',
        birthday: '',
        phoneNumber: '',
        role: 'user',
        createdAt: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({...form, createdAt: new Date().toISOString()})
        });

        const data = await res.json();
        if(res.ok){
            alert('Registration successful');
            router.push('/auth/login');
        } else {
            alert(data.error || 'Registration failed');
        }
    };

    return (
    <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} />
        <input name="birthday" type="date" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
    </form>
    );
}