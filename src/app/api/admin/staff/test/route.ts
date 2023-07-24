import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	const res = await prisma.user.findMany({
		where: {
			role: "STUDENT",
		},
	});
	console.log(res)
	return NextResponse.json(res);
}