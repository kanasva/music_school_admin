import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';

interface User {
	email: string;
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt"
	},
	pages: {
		signIn: '/en/sign-in',
	},
	providers: [
		CredentialsProvider({
			// for default login page
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// Label
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				// check if having input
				if (!credentials?.email || !credentials.password) {
					return null
				}
				// find in database by email
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})
				// if email not found return
				if (!user) {
					return null
				}
				// check password
				const isPasswordValid = await compare(
					credentials.password,
					user.password
				)
				if (!isPasswordValid) {
					return null
				}
				// // retrive name to be in session
				// const name = await prisma.student.findUnique({
				// 	where: {
				// 		userId: user.id
				// 	},
				// 	select: {
				// 		givenName: true,
				// 	},
				// });

				return {
					id: user.id + "",
					// name: name!.givenName,
					email: user.email,
					role: user.role
				}
			}
		})
	],
	callbacks: {
		session: ({ session, token }) => {
			session.user.id = token.id
			// session.user.name = token.name;
			session.user.role = token.role;
			// console.log('session callback', { session, token })
			return session;
		},
		jwt: ({ token, user }) => {
			if (user) {
				// name and email are already included by default
				token.id = user.id
				// token.name = user.name
				token.role = user.role
			}
			// console.log('jwt callback', { token, user })
			return token;
		},
	},
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };