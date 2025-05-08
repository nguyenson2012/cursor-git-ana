import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ }) {
            return true;
        },
        async redirect({ url, baseUrl }) {
            return '/dashboards';
        },
        async session({ session }) {
            return session;
        },
        async jwt({ token }) {
            return token;
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
    }
});

export { handler as GET, handler as POST };