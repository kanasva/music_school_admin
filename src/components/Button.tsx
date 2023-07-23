import Link from 'next/link'
import clsx from 'clsx'
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	secondary?: boolean;
	href?: string;
	className?: string;
	children: ReactNode;
}

export function Button({ secondary, href, className, children, ...props }: ButtonProps) {
	className = clsx(
		className,
		'rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
		secondary
			? 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
			: 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
	)

	let inner = <span className="relative top-px">{children}</span>

	if (href) {
		return (
			<Link href={href} className={className} {...(props as HTMLAttributes<HTMLAnchorElement>)}>
				{inner}
			</Link>
		)
	}

	return (
		<button className={className} {...props}>
			{inner}
		</button>
	)
}