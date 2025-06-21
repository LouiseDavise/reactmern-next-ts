import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    // Option 1: decode the token
    const user = decodeJwt(token);
    return user;

    // Option 2: verify token with server or DB
    // const user = await fetchUserFromDB(token);
    // return user;
}