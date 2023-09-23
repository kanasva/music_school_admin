import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt';
import { RegisterForm } from './RegisterForm';


export default function Register() {
	// async function postRegister(formData: any) {
	// 	"use server"
	// 	const hashedPassword = await bcrypt.hash(formData.password, 10);

	// 	const newUser = await prisma.contact.create({
	// 		data: {
	// 			...formData,
	// 			password: hashedPassword
	// 		}
	// 	});

	// console.log(newUser);
	// }

	return (
		<div>
			<h1>Register</h1>
			<RegisterForm />
		</div>
	)
}
