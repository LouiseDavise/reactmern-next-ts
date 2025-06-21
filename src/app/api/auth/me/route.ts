// app/api/auth/me/route.ts
import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const user = decodeJwt(token);
        return NextResponse.json(user);
    } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
