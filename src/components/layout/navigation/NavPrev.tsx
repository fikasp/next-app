'use client'
// modules
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
// components
import { ArwButton } from '@/components/arw'
// lib
import { useSwipe, useScroll, useKeys } from '@/lib/utils/hooks'
import { Icons } from '@/lib/types/enums'

export default function NavPrev({
	callback,
	className,
	size = 30,
	url,
	keyboard = false,
	scroll = false,
	touch = false,
}: {
	callback?: () => void
	url?: string | undefined | null
	className?: string
	size?: number
	keyboard?: boolean
	scroll?: boolean
	touch?: boolean
}) {
	const router = useRouter()

	const handlePrev = useCallback(() => {
		if (callback) {
			callback()
		} else if (url) {
			router.push(url)
		}
	}, [callback, url, router])

	useKeys({ ArrowLeft: handlePrev }, keyboard)
	useScroll({ ScrollUp: handlePrev }, scroll)
	useSwipe({ SwipeLeft: handlePrev }, touch)

	return (
		<ArwButton
			icon={Icons.ChevronLeft}
			className={className}
			disabled={!url && !callback}
			onClick={handlePrev}
			size={size}
		/>
	)
}
