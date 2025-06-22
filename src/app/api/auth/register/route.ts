import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/dbConnect';
import { User } from '@/models/User';

export async function POST(request: NextRequest) {
    await dbConnect();

    const { username, email, password, age, birthday, phoneNumber, role } = await request.json();

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashed,
            age,
            birthday,
            phoneNumber,
            role: role || 'user'
        });

        return NextResponse.json({ message: 'User created successfully', user });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
