import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcrypt"

interface User {
  email: string
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      // for default login page
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // Label
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // check if having input
        if (!credentials?.email || !credentials.password) {
          return null
        }
        // find in database by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true, // Assuming you want to return the user's id
            email: true, // and email, adjust as needed
            password: true,
            role: true,
            student: {
              select: {
                givenName: true,
                familyName: true,
              },
            },
            teacher: {
              select: {
                givenName: true,
                familyName: true,
              },
            },
            staff: {
              select: {
                givenName: true,
                familyName: true,
              },
            },
          },
        })
        // if email not found return
        if (!user) {
          return null
        }
        // check password
        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        )
        if (!isPasswordValid) {
          return null
        }

        let givenName, familyName

        if (user.student) {
          givenName = user.student.givenName
          familyName = user.student.familyName
        } else if (user.teacher) {
          givenName = user.teacher.givenName
          familyName = user.teacher.familyName
        } else if (user.staff) {
          givenName = user.staff.givenName
          familyName = user.staff.familyName
        }

        return {
          id: user.id + "",
          name: `${givenName} ${familyName}`,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // name and email are already included by default
        token.id = user.id
        // token.name = user.name
        token.role = user.role
      }
      // console.log('jwt callback', { token, user })
      return token
    },
    session: ({ session, token }) => {
      session.user.id = token.id
      // session.user.name = token.name;
      session.user.role = token.role
      // console.log('session callback', { session, token })
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
