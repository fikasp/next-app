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
		<h1 className={cn('text-blue font-bold text-xl text-center', className)}>
			{children}
		</h1>
	)
}
