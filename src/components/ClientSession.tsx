'use client'
import { useSession } from 'next-auth/react'

export function ClientSession() {
	const { data: session } = useSession()
	return <pre>{JSON.stringify(session)}</pre>
}