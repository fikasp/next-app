// lib
import { cn } from '@/lib/utils'

export default function ArwText({
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
		<p
			className={cn(
				center ? 'text-center' : '',
				accent ? 'text-accent' : '',
				className
			)}
		>
			{children}
		</p>
	)
}
