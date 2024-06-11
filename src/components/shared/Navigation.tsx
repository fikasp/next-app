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
		debug(9)
		if (prev) {
			prev()
		} else if (urlPrev) {
			router.push(urlPrev)
		}
	}
	const handleNext = () => {
		debug(9)
		if (next) {
			next()
		} else if (urlNext) {
			router.push(urlNext)
		}
	}
	const handleBack = () => {
		debug(9)
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

		if (!listeners) return
		// Event listeners
		document.addEventListener('keydown', handleKeyPress)
		document.addEventListener('touchstart', handleTouchStart)
		document.addEventListener('touchend', handleTouchEnd)

		return () => {
			document.removeEventListener('keydown', handleKeyPress)
			document.removeEventListener('touchstart', handleTouchStart)
			document.removeEventListener('touchend', handleTouchEnd)
		}
	})

	return (
		<ArwFlex between row className={className}>
			<ArwButton
				src={icons.PREV}
				disabled={!urlPrev && !prev}
				onClick={handlePrev}
				className={classNamePrev}
			/>
			<ArwButton
				src={icons.NEXT}
				disabled={!urlNext && !next}
				onClick={handleNext}
				className={classNameNext}
			/>
			<ArwButton
				src={icons.CLOSE}
				onClick={handleBack}
				className={classNameBack}
			/>
		</ArwFlex>
	)
}
