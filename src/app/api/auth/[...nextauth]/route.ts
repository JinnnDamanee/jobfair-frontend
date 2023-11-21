import {
  getServerSession as nextAuthGetServerSession,
  type AuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getMe, login } from "@/actions/auth";
import NextAuth from "next-auth/next";
import Route from "@/lib/route";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const data = await login({
          email,
          password,
        });
        if (!data.success) return null;

        const me = await getMe(data.token);
        const user: any = {
          id: data._id,
          name: data.name,
          email: data.email,
          token: data.token,
          role: me.role,
          tel: me.tel,
        };
        console.log("data", data);
        console.log("user", user);

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      return { ...session, user: token };
    },
  },
  pages: {
    signIn: Route.LOGIN,
    newUser: Route.SIGNUP,
  },
};

export async function getServerSession() {
  return await nextAuthGetServerSession(authOptions);
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
