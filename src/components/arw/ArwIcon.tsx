// modules
import * as icons from 'lucide-react'
// components
import { ArwSVG } from '@/components/arw'
// lib
import { Icons } from '@/lib/types/enums'

export default function ArwIcon({
	icon,
	className,
	size = 24,
	src,
}: {
	icon?: Icons
	className?: string
	size?: number
	src?: string
}) {
	if (icon) {
		const LucideIcon = icons[icon]
		if (LucideIcon) {
			return <LucideIcon className={className} size={size} />
		} else {
			return null
		}
	}
	if (src) {
		return <ArwSVG src={src} className={className} size={size} />
	}
	return null
}
