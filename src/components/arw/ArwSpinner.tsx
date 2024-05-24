// lib
import { cn } from '@/lib/utils'

export default function ArwSpinner({
	accent,
	className,
}: {
	accent?: boolean
	className?: string
}) {
	return (
		<div className="flex-center grow">
			<div
				className={cn(
					'animate-spin h-32 w-32 rounded-full border-8 border-t-8',
					accent
						? 'border-accent-300 border-t-accent  dark:border-accent-800 dark:border-t-accent'
						: 'border-base-300 border-t-base dark:border-base-800 dark:border-t-base',
					className
				)}
			></div>
		</div>
	)
}
