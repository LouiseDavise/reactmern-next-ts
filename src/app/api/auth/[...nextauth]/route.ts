import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user.id = token.id as string;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.role = token.role as string;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth/login', // optional custom login page
    },
});

export { handler as GET, handler as POST };
