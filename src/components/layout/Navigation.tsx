'use client'
// modules
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// components
import { ArwButton } from '@/components/arw'
// lib
import { Icons } from '@/lib/types/enums'

const Nav = ({
	callback,
	className,
	icon,
	size,
	url,
}: {
	callback?: () => void
	url?: string | undefined | null
	icon: Icons
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
			icon={icon}
			className={className}
			onClick={handleNav}
			size={size}
		/>
	)
}

const NavPrev = ({
	callback,
	className,
	size = 30,
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
			icon={Icons.ChevronLeft}
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
	size = 30,
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
			icon={Icons.ChevronRight}
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
	size = 30,
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
			icon={Icons.X}
			className={className}
			onClick={handleClose}
			size={size}
		/>
	)
}

export { Nav, NavPrev, NavNext, NavClose }
