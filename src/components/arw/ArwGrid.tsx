// lib
import { cn } from '@/lib/utils'

export default function ArwGrid({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<div className={cn('grid grid-cols-[auto_auto] gap-4', className)}>
			{children}
		</div>
	)
}
