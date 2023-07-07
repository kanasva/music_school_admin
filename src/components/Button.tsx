// unused

"use client"
import { signIn } from "next-auth/react"

type ButtonProps = {
	text: string;
}

export function Button({ text }: ButtonProps) {
	return (
		<button onClick={() => signIn()}>
			{text}
		</button>
	)
}