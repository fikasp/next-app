// lib
import { cn } from '@/lib/utils'

export default function ArwPaper({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'flex flex-col gap-4 arw-bg-secondary rounded-xl shadow-lg p-8',
				className
			)}
		>
			{children}
		</div>
	)
}
