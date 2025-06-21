import {NextRequest, NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest){
    const token = req.cookies.get('token')?.value;
    const url = req.nextUrl;

    if(!token){
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {role : string};
        const isAdminRoute = url.pathname.startsWith('/admin');

        if(isAdminRoute && decoded.role !== 'admin'){
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'], // pages to protect
};
