import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: "USER"
  }

  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id?: string
      role?: "USER"
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USER"
  }
}

