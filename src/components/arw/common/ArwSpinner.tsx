// lib
import { cn } from '@/lib/utils'

export default function ArwSpinner({
	accent,
	className,
	absolute,
}: {
	accent?: boolean
	className?: string
	absolute?: boolean
}) {
	return (
		<div
			className={cn(
				absolute
					? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
					: 'flex-center grow'
			)}
		>
			<div
				className={cn(
					'animate-spin h-32 w-32 rounded-full border-8 border-t-8',
					accent
						? 'border-accent-300 border-t-accent-400  dark:border-accent-800 dark:border-t-accent-700'
						: 'border-base-300 border-t-base-400 dark:border-base-800 dark:border-t-base-700',
					className
				)}
			></div>
		</div>
	)
}
