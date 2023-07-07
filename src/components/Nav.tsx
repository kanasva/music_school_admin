import Link from 'next/link'

export function Nav() {

	return (
		<nav>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/sign-in">Sign in</Link>
				</li>
				<li>
					<Link href="/register">Register</Link>
				</li>
				<li>
					<Link href="/session-check">Session Check</Link>
				</li>
			</ul>
		</nav >
	)
}