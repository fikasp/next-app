// lib
import { cn } from '@/lib/utils'

export default function ArwTitle({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<h1
			className={cn('text-center text-xl font-bold', className)}
		>
			{children}
		</h1>
	)
}
