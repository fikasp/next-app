'use client'
// modules
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// components
import { ArwButton } from '@/components/arw'
// lib
import { icons } from '@/lib/constants/paths'


const Nav = ({
	callback,
	className,
	src,
	size,
	url,
}: {
	callback?: () => void
	url?: string | undefined | null
	src: string
	className?: string
	size?: number
}) => {
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
			src={src}
			className={className}
			onClick={handleNav}
			size={size}
		/>
	)
}



const NavPrev = ({
	callback,
	className,
	size,
	url,
	keyboard,
	scroll,
	touch,
}: {
	callback?: () => void
	url?: string | undefined | null
	className?: string
	size?: number
	keyboard?: boolean
	scroll?: boolean
	touch?: boolean
}) => {
	const router = useRouter()

	const handlePrev = () => {
		if (callback) {
			callback()
		} else if (url) {
			router.push(url)
		}
	}

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
			document.removeEventListener('keydown', handleKeyPress)
			document.removeEventListener('touchstart', handleTouchStart)
			document.removeEventListener('touchend', handleTouchEnd)
			document.removeEventListener('wheel', handleWheel)
		}
	})

	return (
		<ArwButton
			src={icons.PREV}
			className={className}
			disabled={!url && !callback}
			onClick={handlePrev}
			size={size}
		/>
	)
}

const NavNext = ({
	callback,
	className,
	size,
	url,
	keyboard,
	scroll,
	touch,
}: {
	callback?: () => void
	url?: string | undefined | null
	className?: string
	size?: number
	keyboard?: boolean
	scroll?: boolean
	touch?: boolean
}) => {
	const router = useRouter()

	const handleNext = () => {
		if (callback) {
			callback()
		} else if (url) {
			router.push(url)
		}
	}

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'ArrowRight') {
				handleNext()
			}
		}

		const handleWheel = (event: WheelEvent) => {
			if (event.deltaY > 0) {
				handleNext()
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
				handleNext()
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
			document.removeEventListener('keydown', handleKeyPress)
			document.removeEventListener('touchstart', handleTouchStart)
			document.removeEventListener('touchend', handleTouchEnd)
			document.removeEventListener('wheel', handleWheel)
		}
	})

	return (
		<ArwButton
			src={icons.NEXT}
			className={className}
			disabled={!url && !callback}
			onClick={handleNext}
			size={size}
		/>
	)
}

const NavClose = ({
	callback,
	className,
	size,
	url,
}: {
	callback?: () => void
	url?: string | undefined | null
	className?: string
	size?: number
}) => {
	const router = useRouter()

	const handleClose = () => {
		if (callback) {
			callback()
		} else if (url) {
			router.push(url)
		} else {
			router.back()
		}
	}

	useEffect(() => {
		window.addEventListener('popstate', handleClose)
		return () => {
			window.removeEventListener('popstate', handleClose)
		}
	})

	return (
		<ArwButton
			src={icons.CLOSE}
			className={className}
			onClick={handleClose}
			size={size}
		/>
	)
}

export { Nav, NavPrev, NavNext, NavClose }
