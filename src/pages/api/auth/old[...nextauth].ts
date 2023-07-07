import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt"
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// for default login page
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const user = { id: "1333", name: "J Smith", email: "jsmith@example.com", role: "teacher" }
				// const { email, password } = credentials as { email: string, password: string }
				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			}
		})
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		session: async ({ session, token }) => {
			session.user.id = token.id; // add this line
			session.user.role = token.role;
			return session;
		},
	},
}
// pages: {
// sign in page
// signIn: '/'
// }


export default NextAuth(authOptions)