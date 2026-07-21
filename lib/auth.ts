import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
  type Role,
} from "@/lib/repository";

/**
 * Auth.js (NextAuth v5) configuration.
 *
 * Google login requires real OAuth credentials in your environment:
 *   AUTH_GOOGLE_ID=...
 *   AUTH_GOOGLE_SECRET=...
 *   AUTH_SECRET=...            (generate with `npx auth secret`)
 *
 * Both providers are backed by PostgreSQL via Prisma (see lib/prisma.ts /
 * prisma/schema.prisma):
 *  - Credentials: looks up the user by email and checks the bcrypt hash.
 *  - Google: auto-provisions a "client" user on first sign-in.
 *
 * A demo admin account is seeded by `prisma/seed.ts`:
 *   email: admin@muhirisdoctor.com
 *   password: admin1234
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const user = await findUserByEmail(email);
        if (!user || !verifyPassword(user, password)) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as Role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Auto-provision a local "client" record for Google sign-ins so
      // every logged-in user has a row (and a role) in the database.
      if (account?.provider === "google" && user.email) {
        const existing = await findUserByEmail(user.email);
        if (!existing) {
          await createUser({
            name: user.name ?? user.email.split("@")[0],
            email: user.email,
            provider: "google",
            role: "client",
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // On credentials login `user.role` is set above. On Google login
        // we look the freshly-provisioned row up to get id/role.
        const role = (user as { role?: Role }).role;
        if (role) {
          token.role = role;
          token.id = user.id;
        } else if (user.email) {
          const dbUser = await findUserByEmail(user.email);
          if (dbUser) {
            token.role = dbUser.role as Role;
            token.id = dbUser.id;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role) ?? "client";
      }
      return session;
    },
  },
});
