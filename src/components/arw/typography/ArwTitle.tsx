// lib
import { cn } from '@/lib/utils'

export default function ArwTitle({
	children,
	className,
	center,
	accent,
}: {
	children: React.ReactNode
	className?: string
	center?: boolean
	accent?: boolean
}) {
	return (
		<h1
			className={cn(
				'text-xl font-bold',
				center ? 'text-center' : '',
				accent ? 'text-accent' : '',
				className
			)}
		>
			{children}
		</h1>
	)
}
