// components
import { ArwIcon } from '@/components/arw'
// lib
import { cn } from '@/lib/utils'

export default function ArwButton({
	onClick,
	className,
	disabled,
	label,
	src,
	size,
}: {
	onClick: () => void
	className?: string
	disabled?: boolean
	label?: string
	src?: string
	size?: number
}) {
	return (
		<div
			onClick={onClick}
			aria-label={label}
			className={cn(
				disabled ? 'text-gray-400' : 'hover:text-accent-400',
				'flex-center gap-2',
				className
			)}
		>
			{src && <ArwIcon src={src} size={size} />}
			{label}
		</div>
	)
}
