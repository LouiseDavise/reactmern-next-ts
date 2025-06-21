import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbConnect } from '@/lib/dbConnect';
import {User} from '@/models/User';

export async function POST(req: NextRequest){
    await dbConnect();
    const {username, password} = await req.json();
    const user = await User.findOne({username});
    
    if(!user || !(await bcrypt.compare(password, user.password))){
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {expiresIn: '1h'});

    return NextResponse.json({token});
}