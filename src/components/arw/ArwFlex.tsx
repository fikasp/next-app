// lib
import { cn } from '@/lib/utils'

export default function ArwFlex({
	children,
	className,
	between,
	center,
	row,
}: {
	children: React.ReactNode
	className?: string
	between?: boolean
	center?: boolean
	row?: boolean
}) {
	return (
		<div
			className={cn(
				'flex gap-4',
				row ? '' : 'flex-col',
				center ? 'justify-center items-center' : '',
				between ? 'justify-between items-center' : '',
				className
			)}
		>
			{children}
		</div>
	)
}
