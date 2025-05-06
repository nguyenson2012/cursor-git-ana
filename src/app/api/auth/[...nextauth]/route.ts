import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../lib/supabaseClient";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists in Supabase
          const { data: existingUser, error: queryError } = await supabase
            .from('users')
            .select()
            .eq('email', user.email)
            .single();

          if (queryError && !existingUser) {
            // User doesn't exist, create new user
            const { error: insertError } = await supabase
              .from('users')
              .insert([
                {
                  email: user.email,
                  name: user.name,
                  image: user.image,
                  provider: 'google',
                  provider_id: profile?.sub
                }
              ]);

            if (insertError) {
              console.error('Error saving user to Supabase:', insertError);
              return false;
            }
          }
          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, account, profile }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };