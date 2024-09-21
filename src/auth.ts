import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
// import argon2 from "@node-rs/argon2";
// import bcrypt from "bcrypt";

import { getUser } from "./lib/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        name: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            name: z.string().min(1),
            password: z.string().min(1),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { name, password } = parsedCredentials.data;

          const user = await getUser(name);

          if (!user) {
            return null;
          }

          // const passwordsMatch = await argon2.verify(user.password, password);
          // const passwordsMatch = await bcrypt.compare(password, user.password);

          // TODO: Нельзя хранить пароли в незашифрованном виде,
          // но у меня не получается заставить работать argon2 и bcrypt.
          // Сейчас не критично, попробую еще, когда библиотеки зарелизятся.
          const passwordsMatch = user.password === password;

          if (passwordsMatch) {
            return { ...user, id: user.id.toString() };
          }
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith("/admin");

      if (isOnDashboard) {
        return isLoggedIn;
      }

      return true;
    },
  },
});
