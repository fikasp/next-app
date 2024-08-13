'use client'
// modules
import { useRouter } from 'next/navigation'
// components
import { ArwButton } from '@/components/arw'
// lib
import { Icons } from '@/lib/types/enums'

export default function Nav({
	callback,
	className,
	icon,
	size,
	url,
}: {
	callback?: () => void
	url?: string | undefined | null
	icon: Icons
	className?: string
	size?: number
}) {
	const router = useRouter()

	const handleNav = () => {
		if (callback) {
			callback()
		} else if (url) {
			router.push(url)
		}
	}

	return (
		<ArwButton
			icon={icon}
			className={className}
			onClick={handleNav}
			size={size}
		/>
	)
}
