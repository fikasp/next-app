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
	className,
	prevButtonClass,
	nextButtonClass,
	backButtonClass,
}: {
	back?: string | undefined | null
	prev?: string | undefined | null
	next?: string | undefined | null
	className?: string
	prevButtonClass?: string
	nextButtonClass?: string
	backButtonClass?: string
}) {
	const router = useRouter()

	// Navigation handlers
	const handlePrev = () => {
		debug(0)
		if (prev) {
			router.push(prev)
		}
	}
	const handleNext = () => {
		debug(0)
		if (next) {
			router.push(next)
		}
	}
	const handleBack = () => {
		if (back) {
			debug(0, 0, back)
			router.push(back)
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
				src={icons.BACK}
				disabled={!prev}
				onClick={handlePrev}
				className={prevButtonClass}
			/>
			<ArwButton
				src={icons.NEXT}
				disabled={!next}
				onClick={handleNext}
				className={nextButtonClass}
			/>
			<ArwButton
				src={icons.CLOSE}
				onClick={handleBack}
				className={backButtonClass}
			/>
		</ArwFlex>
	)
}
