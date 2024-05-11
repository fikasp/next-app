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
				'flex flex-col gap-4 border border-base-300 dark:border-base-700 rounded-xl p-8',
				className
			)}
		>
			{children}
		</div>
	)
}
