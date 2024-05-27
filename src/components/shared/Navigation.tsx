'use client'
// modules
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// components
import ArwFlex from '@/components/arw/ArwFlex'
import { icons } from '@/navigation'
import ArwButton from '../arw/ArwButton'

export default function Navigation({
	back,
	prev,
	next,
	className,
}: {
	back?: string | undefined | null
	prev?: string | undefined | null
	next?: string | undefined | null
	className?: string
}) {
	const router = useRouter()

	const handlePrevClick = () => {
		console.log('handleprevclick')

		if (prev) {
			router.push(prev)
		}
	}
	const handleNextClick = () => {
		console.log('handlenextclick')
		if (next) {
			router.push(next)
		}
	}
	const handleBackClick = () => {
		if (back) {
			router.push(back)
		} else {
			router.back()
		}
	}

	useEffect(() => {
		const keyMap: { [key: string]: () => void } = {
			ArrowLeft: handlePrevClick,
			ArrowRight: handleNextClick,
			ArrowUp: handleBackClick,
		}

		const handleKeyPress = (event: KeyboardEvent) => {
			const handler = keyMap[event.key]
			if (handler) {
				handler()
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

			if (swipeDistance > 50) {
				handleNextClick()
			} else if (swipeDistance < -50) {
				handlePrevClick()
			}
		}
		
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
			<ArwButton src={icons.BACK} disabled={!prev} onClick={handlePrevClick} />
			<ArwButton src={icons.NEXT} disabled={!next} onClick={handleNextClick} />
			<ArwButton src={icons.CLOSE} onClick={handleBackClick} />
		</ArwFlex>
	)
}
