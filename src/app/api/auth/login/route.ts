import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbConnect } from '@/lib/dbConnect';
import {User} from '@/models/User';

export async function POST(req: NextRequest){
    await dbConnect();
    const {username, password} = await req.json();
    const user = await User.findOne({
        $or: [
            {username}, {email: username}
        ]
    });
    
    if(!user || !(await bcrypt.compare(password, user.password))){
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const token = jwt.sign({ userId: user._id, role : user.role }, process.env.JWT_SECRET!, {expiresIn: '1h'});

    const response = NextResponse.json({
        message: 'Login successful',
        role: user.role,
    });

    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60,
    });

    return response;
}