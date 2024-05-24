import { cn } from '@/lib/utils'

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-md bg-base-100 dark:bg-base-800',
				className
			)}
			{...props}
		/>
	)
}

export { Skeleton }
