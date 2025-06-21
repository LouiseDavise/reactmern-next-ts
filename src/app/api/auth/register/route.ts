import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/dbConnect';
import { User } from '@/models/User';

export async function POST(request: NextRequest) {
    await dbConnect();
    const { username, password } = await request.json();
    const hashed = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({username, password: hashed});
        return NextResponse.json({message: 'User created successfully', user});
    } catch {
        return NextResponse.json({error: 'User already exists'}, {status : 400});
    }
}