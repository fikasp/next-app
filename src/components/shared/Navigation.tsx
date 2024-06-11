'use client'
// modules
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// components
import ArwFlex from '@/components/arw/ArwFlex'
import ArwButton from '@/components/arw/ArwButton'
// lib
import { debug } from '@/lib/utils/dev'
import { icons } from '@/navigation'

export default function Navigation({
	back,
	prev,
	next,
	urlBack,
	urlPrev,
	urlNext,
	classNameBack,
	classNamePrev,
	classNameNext,
	className,
	listeners,
}: {
	back?: () => void
	prev?: () => void
	next?: () => void
	urlBack?: string | undefined | null
	urlPrev?: string | undefined | null
	urlNext?: string | undefined | null
	classNameBack?: string
	classNamePrev?: string
	classNameNext?: string
	className?: string
	listeners?: boolean
}) {
	const router = useRouter()

	// Navigation handlers
	const handlePrev = () => {
		debug(0)
		if (prev) {
			prev()
		} else if (urlPrev) {
			router.push(urlPrev)
		}
	}
	const handleNext = () => {
		debug(0)
		if (next) {
			next()
		} else if (urlNext) {
			router.push(urlNext)
		}
	}
	const handleBack = () => {
		debug(0)
		if (back) {
			back()
		} else if (urlBack) {
			router.push(urlBack)
		} else {
			router.back()
		}
	}

	useEffect(() => {
		// Keybord navigation
		const keyMap: { [key: string]: () => void } = {
			ArrowLeft: handlePrev,
			ArrowRight: handleNext,
			ArrowUp: handleBack,
		}

		const handleKeyPress = (event: KeyboardEvent) => {
			const handler = keyMap[event.key]
			if (handler) {
				handler()
			}
		}

		// Touch navigation
		let touchStartX = 0
		let touchEndX = 0

		const handleTouchStart = (event: TouchEvent) => {
			touchStartX = event.touches[0].clientX
		}

		const handleTouchEnd = (event: TouchEvent) => {
			touchEndX = event.changedTouches[0].clientX

			const swipeDistance = touchStartX - touchEndX

			if (swipeDistance > 50) {
				handleNext()
			} else if (swipeDistance < -50) {
				handlePrev()
			}
		}

		// Mouse wheel navigation
		const handleWheel = (event: WheelEvent) => {
			if (event.deltaY > 0) {
				handleNext()
			} else if (event.deltaY < 0) {
				handlePrev()
			}
		}

		// Event listeners
		if (!listeners) return
		document.addEventListener('keydown', handleKeyPress)
		document.addEventListener('touchstart', handleTouchStart)
		document.addEventListener('touchend', handleTouchEnd)
		document.addEventListener('wheel', handleWheel)

		return () => {
			document.removeEventListener('keydown', handleKeyPress)
			document.removeEventListener('touchstart', handleTouchStart)
			document.removeEventListener('touchend', handleTouchEnd)
			document.removeEventListener('wheel', handleWheel)
		}
	})

	return (
		<ArwFlex between row className={className}>
			<ArwButton
				src={icons.PREV}
				disabled={!urlPrev && !prev}
				className={classNamePrev}
				onClick={handlePrev}
			/>
			<ArwButton
				src={icons.NEXT}
				disabled={!urlNext && !next}
				className={classNameNext}
				onClick={handleNext}
			/>
			<ArwButton
				src={icons.CLOSE}
				className={classNameBack}
				onClick={handleBack}
			/>
		</ArwFlex>
	)
}
