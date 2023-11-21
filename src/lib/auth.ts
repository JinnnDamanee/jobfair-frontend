// import {
//   getServerSession as nextAuthGetServerSession,
//   type AuthOptions,
// } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { validateAccessToken, verifyAccessToken } from "./token";
// import { getMe, login } from "@/actions/auth";

// export const authOptions: AuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) return null;
//         const { email, password } = credentials;
//         const data = await login({
//           email,
//           password,
//         });
//         const me = await getMe(data.token);
//         const user: any = {
//           id: data._id,
//           name: data.name,
//           email: data.email,
//           token: data.token,
//           role: me.role,
//           tel: me.tel,
//         };
//         console.log(data);
//         console.log(user);

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },
//     async session({ session, token }) {
//       return { ...session, user: token };
//     },
//   },
// };

// export async function getServerSession() {
//   return await nextAuthGetServerSession(authOptions);
// }
