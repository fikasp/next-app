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
				'flex flex-col gap-6 bg-stone-800 rounded-2xl p-8 shadow-lg',
				className
			)}
		>
			{children}
		</div>
	)
}
