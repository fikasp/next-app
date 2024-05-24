// lib
import { cn } from '@/lib/utils'

export default function ArwContainer({
	children,
	className,
	center,
	grid,
}: {
	children: React.ReactNode
	className?: string
	center?: boolean
	grid?: boolean
}) {
	return (
		<div
			className={cn(
				'container grow p-4',
				grid ? 'grid' : 'flex flex-col',
				center ? 'justify-center items-center' : '',
				className
			)}
		>
			{children}
		</div>
	)
}
