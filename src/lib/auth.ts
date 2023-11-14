// import { getCompanyMe } from "@/actions/get-company-me";
// import { getStudentMe } from "@/actions/get-student-me";
import {
  getServerSession as nextAuthGetServerSession,
  type AuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateAccessToken, verifyAccessToken } from "./token";
import { Role, type User } from "@/types/user";
import { login } from "@/actions/auth";

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
        // const { status, accessToken, refreshToken } = await login({
        //   email,
        //   password,
        // });
        const user: User = {
            id: "1",
            tel: "123456789",
            name: "Admin",
            email: "unknown email",
            role: Role.ADMIN,
            };
        let status = "200";
        if (status !== "200") return null;
        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token,...user };
    },
    async session({ session, token}) {
      return { ...session ,user:token};
    },
  },
};

export async function getServerSession() {
  return await nextAuthGetServerSession(authOptions);
}
