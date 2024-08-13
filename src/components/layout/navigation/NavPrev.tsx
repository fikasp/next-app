'use client'
// modules
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
// components
import { ArwButton } from '@/components/arw'
// lib
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

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft') {
				handlePrev()
			}
		}

		const handleWheel = (event: WheelEvent) => {
			if (event.deltaY < 0) {
				handlePrev()
			}
		}

		let touchStartX = 0
		let touchEndX = 0

		const handleTouchStart = (event: TouchEvent) => {
			touchStartX = event.touches[0].clientX
		}

		const handleTouchEnd = (event: TouchEvent) => {
			touchEndX = event.changedTouches[0].clientX
			const swipeDistance = touchStartX - touchEndX
			if (swipeDistance < -50) {
				handlePrev()
			}
		}

		// Event listeners
		if (keyboard) {
			document.addEventListener('keydown', handleKeyPress)
		}
		if (touch) {
			document.addEventListener('touchstart', handleTouchStart)
			document.addEventListener('touchend', handleTouchEnd)
		}
		if (scroll) {
			document.addEventListener('wheel', handleWheel)
		}
		return () => {
			if (keyboard) {
				document.removeEventListener('keydown', handleKeyPress)
			}
			if (touch) {
				document.removeEventListener('touchstart', handleTouchStart)
				document.removeEventListener('touchend', handleTouchEnd)
			}
			if (scroll) {
				document.removeEventListener('wheel', handleWheel)
			}
		}
	}, [keyboard, scroll, touch, handlePrev])

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
