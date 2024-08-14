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
	keys = false,
	scroll = false,
	swipe = false,
}: {
	callback?: () => void
	url?: string | undefined | null
	className?: string
	size?: number
	keys?: boolean
	scroll?: boolean
	swipe?: boolean
}) {
	const router = useRouter()

	const handlePrev = useCallback(() => {
		if (callback) {
			callback()
		} else if (url) {
			router.push(url)
		}
	}, [callback, url, router])

	useKeys({ ArrowLeft: handlePrev }, keys)
	useScroll({ ScrollUp: handlePrev }, scroll)
	useSwipe({ SwipeRight: handlePrev }, swipe)

	return (
		<ArwButton
			icon={Icons.ChevronLeft}
			disabled={!url && !callback}
			className={className}
			onClick={handlePrev}
			size={size}
		/>
	)
}
