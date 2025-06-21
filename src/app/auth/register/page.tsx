'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';

export default function RegisterPage(){
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(res => {
                const user = res.data;
                if (user?.role === 'admin') router.push('/admin');
                else if (user?.role === 'user') router.push('/dashboard');
            })
            .catch(() => {
            });
    }, []);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios.post('/api/auth/register', {
            ...form,
            createdAt: new Date().toISOString()
        })
        .then((res) => {
            alert('Registration successful');
            router.push('/auth/login');
        })
        .catch((error) => {
            const errorMsg = error.response?.data?.error || 'Registration failed';
            alert(errorMsg);
        });
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