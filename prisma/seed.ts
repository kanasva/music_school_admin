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
			password: password
		}
	})
	const password2 = await hash('bbb', 12)
	const user2 = await prisma.user.upsert({
		where: { email: 'bbb@bbb.com' },
		update: {},
		create: {
			email: 'bbb@bbb.com',
			password: password2
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