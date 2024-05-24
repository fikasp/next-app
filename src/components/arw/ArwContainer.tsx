// lib
import { cn } from '@/lib/utils'

export default function ArwContainer({
	children,
	className,
	center,
	grow,
}: {
	children: React.ReactNode
	className?: string
	center?: boolean
	grow?: boolean
}) {
	return (
		<div
			className={cn(
				'container flex flex-col p-4',
				grow ? 'grow' : '',
				center ? 'justify-center items-center' : '',
				className
			)}
		>
			{children}
		</div>
	)
}
