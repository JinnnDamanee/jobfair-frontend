import { User } from "@/types/user";
import "next-auth";

// declare module "next-auth/jwt" {
//   /**
//    * Returned by the `jwt` callback and `getToken`, when using JWT sessions
//    *
//    * [`jwt` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) | [`getToken`](https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken)
//    */
//   interface JWT {
//     accessToken: string;
//   }
// }

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, returned by the `session` callback
   * and also the shape received as a prop on the `SessionProvider` React Context
   *
   * [`useSession`](https://next-auth.js.org/getting-started/client#usesession) |
   * [`getSession`](https://next-auth.js.org/getting-started/client#getsession) |
   * [`SessionProvider`](https://next-auth.js.org/getting-started/client#sessionprovider) |
   * [`session` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback)
   */
  interface Session {
    user: User & { token: string };
  }
}
