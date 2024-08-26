// modules
import Link from 'next/link'
// lib
import { cn } from '@/lib/utils'

export default function ArwLink({
	children,
	className,
	href,
}: {
	children: React.ReactNode
	className?: string
	href: string
}) {
	return (
		<Link href={href} className={cn('hover:text-accent transition', className)}>
			{children}
		</Link>
	)
}
