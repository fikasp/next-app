// lib
import { cn } from '@/lib/utils'

export default function ArwPaper({
	children,
	className,
	accent,
	between,
	center,
	square,
	grow,
}: {
	children: React.ReactNode
	className?: string
	accent?: boolean
	between?: boolean
	center?: boolean
	square?: boolean
	grow?: boolean
}) {
	return (
		<div
			className={cn(
				'flex flex-col gap-4 p-8 shadow-xl rounded-xl ',
				center ? 'justify-center items-center' : '',
				between ? 'justify-between items-center' : '',
				accent
					? 'bg-accent-200 dark:bg-accent-900'
					: 'bg-base-100 dark:bg-base-950/50',
				square ? 'aspect-square' : '',
				grow ? 'grow' : '',
				className
			)}
		>
			{children}
		</div>
	)
}