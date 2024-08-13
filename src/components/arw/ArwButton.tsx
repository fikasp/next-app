// components
import { ArwIcon } from '@/components/arw'
import { Icons } from '@/lib/types/enums'
// lib
import { cn } from '@/lib/utils'

export default function ArwButton({
	onClick,
	className,
	disabled,
	label,
	icon,
	src,
	size,
}: {
	onClick?: () => void
	className?: string
	disabled?: boolean
	label?: string
	icon?: Icons
	src?: string
	size?: number
}) {
	return (
		<div
			onClick={onClick}
			aria-label={label}
			className={cn(
				disabled ? 'text-gray-400' : 'hover:text-accent-400',
				'flex-center gap-2 cursor-pointer transition',
				className
			)}
		>
			{src && <ArwIcon src={src} size={size} />}
			{icon && <ArwIcon icon={icon} size={size} />}
			{label}
		</div>
	)
}
