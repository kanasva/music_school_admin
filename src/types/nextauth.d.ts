import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string
      role: string
    }
  }
  interface User {
    role: string
  }
}
