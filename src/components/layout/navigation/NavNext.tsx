'use client'
// modules
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
// components
import { ArwButton } from '@/components/arw'
// lib
import { useKeys, useSwipe, useScroll } from '@/lib/utils/hooks'
import { Icons } from '@/lib/types/enums'

export default function NavNext({
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

	const handleNext = useCallback(() => {
		if (callback) {
			callback()
		} else if (url) {
			router.push(url)
		}
	}, [callback, url, router])

	useKeys({ ArrowRight: handleNext }, keyboard)
	useScroll({ ScrollDown: handleNext }, scroll)
	useSwipe({ SwipeLeft: handleNext }, touch)

	return (
		<ArwButton
			icon={Icons.ChevronRight}
			disabled={!url && !callback}
			className={className}
			onClick={handleNext}
			size={size}
		/>
	)
}
