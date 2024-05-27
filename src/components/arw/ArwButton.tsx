// modules
import { MouseEventHandler } from 'react'
// components
import { cn } from '@/lib/utils'
import ArwIcon from './ArwIcon'

export default function ArwButton({
	onClick,
	className,
	label,
	src,
}: {
	onClick: MouseEventHandler<HTMLButtonElement>
	className?: string
	label?: string
	src?: string
}) {
	return (
		<button
			onClick={onClick}
			aria-label={label}
			className={cn(
				'flex-center gap-2 hover:text-accent transition',
				className
			)}
		>
			{src && <ArwIcon src={src} />}
			{label}
		</button>
	)
}
