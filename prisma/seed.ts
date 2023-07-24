import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
	const password = await hash('aaa', 12)
	const user = await prisma.user.upsert({
		where: { email: 'aaa@aaa.com' },
		update: {},
		create: {
			email: 'aaa@aaa.com',
			password: password,
			role: "STUDENT"
		}
	})
	const password2 = await hash('bbb', 12)
	const user2 = await prisma.user.upsert({
		where: { email: 'bbb@bbb.com' },
		update: {},
		create: {
			email: 'bbb@bbb.com',
			password: password2,
			role: "TEACHER"
		}
	})
	const password3 = await hash('ccc', 12)
	const user3 = await prisma.user.upsert({
		where: { email: 'ccc@ccc.com' },
		update: {},
		create: {
			email: 'ccc@ccc.com',
			password: password3,
			role: "ADMIN"
		}
	})
	const password4 = await hash('ddd', 12)
	const user4 = await prisma.user.upsert({
		where: { email: 'ddd@ddd.com' },
		update: {},
		create: {
			email: 'ddd@ddd.com',
			password: password4,
			role: "MANAGER"
		}
	})
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})