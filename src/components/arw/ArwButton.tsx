// modules
import { MouseEventHandler } from 'react'
// components
import { cn } from '@/lib/utils'
import ArwIcon from './ArwIcon'

export default function ArwButton({
	onClick,
	className,
	disabled,
	label,
	src,
}: {
	onClick: MouseEventHandler<HTMLButtonElement>
	className?: string
	disabled?: boolean
	label?: string
	src?: string
}) {
	return (
		<button
			onClick={onClick}
			aria-label={label}
			disabled={disabled}
			className={cn(
				disabled ? 'text-gray-400' : 'hover:text-accent-400',
				'flex-center gap-2',
				className
			)}
		>
			{src && <ArwIcon src={src} />}
			{label}
		</button>
	)
}
