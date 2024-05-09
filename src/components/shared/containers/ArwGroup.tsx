// lib
import { cn } from '@/lib/utils'

export default function ArwGroup({
	children,
	className,
	row = false,
}: {
	children: React.ReactNode
	className?: string
	row?: boolean
}) {
	return (
		<div className={cn(`flex ${row ? '' : 'flex-col'} gap-4`, className)}>
			{children}
		</div>
	)
}
