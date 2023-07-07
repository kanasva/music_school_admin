import { ClientSession } from '@/components/ClientSession'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function SessionCheck() {
	const session = await getServerSession(authOptions)
	return (
		<>
			<h2>Server Session</h2>
			<pre>{JSON.stringify(session)}</pre>
			<h2>Client Session</h2>
			<ClientSession />
		</>
	)
}