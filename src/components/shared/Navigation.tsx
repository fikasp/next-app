'use client'
// modules
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// components
import { ArwFlex, ArwButton } from '@/components/arw'
// lib
import { icons } from '@/lib/constants/paths'
import { debug } from '@/lib/utils/dev'

export default function Navigation({
	close,
	prev,
	next,
	urlClose,
	urlPrev,
	urlNext,
	classNameClose,
	classNamePrev,
	classNameNext,
	className,
	listenersKey,
	listenersScroll,
	listenersTouch,
	size,
}: {
	close?: () => void
	prev?: () => void
	next?: () => void
	urlClose?: string | undefined | null
	urlPrev?: string | undefined | null
	urlNext?: string | undefined | null
	classNameClose?: string
	classNamePrev?: string
	classNameNext?: string
	className?: string
	listenersKey?: boolean
	listenersScroll?: boolean
	listenersTouch?: boolean
	size?: number
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
	const handleClose = () => {
		debug(0)
		if (close) {
			close()
		} else if (urlClose) {
			router.push(urlClose)
		} else {
			router.back()
		}
	}

	useEffect(() => {
		// Keybord navigation
		const keyMap: { [key: string]: () => void } = {
			ArrowLeft: handlePrev,
			ArrowRight: handleNext,
			ArrowUp: handleClose,
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
		if (listenersKey) {
			document.addEventListener('keydown', handleKeyPress)
		}
		if (listenersTouch) {
			document.addEventListener('touchstart', handleTouchStart)
			document.addEventListener('touchend', handleTouchEnd)
		}
		if (listenersScroll) {
			document.addEventListener('wheel', handleWheel)
		}
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
				size={size}
				disabled={!urlPrev && !prev}
				className={classNamePrev}
				onClick={handlePrev}
			/>
			<ArwButton
				src={icons.NEXT}
				size={size}
				disabled={!urlNext && !next}
				className={classNameNext}
				onClick={handleNext}
			/>
			<ArwButton
				src={icons.CLOSE}
				size={size}
				className={classNameClose}
				onClick={handleClose}
			/>
		</ArwFlex>
	)
}
