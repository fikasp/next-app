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
				'flex flex-col gap-4 bg-base-100 dark:bg-base-950/50 shadow-xl rounded-xl p-8',
				className
			)}
		>
			{children}
		</div>
	)
}
