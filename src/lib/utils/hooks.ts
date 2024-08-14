// modules
import { useMediaQuery } from 'react-responsive'
import { useRef, useCallback, useEffect } from 'react'
import { debug } from './dev'

// Use debounce to delay the execution of a function
export function useDebounce(
	// eslint-disable-next-line no-unused-vars
	func: (...args: any[]) => void,
	wait: number
	// eslint-disable-next-line no-unused-vars
): (...args: any[]) => void {
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

	const debouncedFunc = useCallback(
		(...args: any[]) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
			timeoutRef.current = setTimeout(() => {
				func(...args)
			}, wait)
		},
		[func, wait]
	)
	return debouncedFunc
}

// Use mobile to check if the screen is mobile
export function useMobile() {
	const isMobile = useMediaQuery({ maxWidth: 768 })
	return isMobile
}

type KeyActions = {
	ArrowUp?: () => void
	ArrowDown?: () => void
	ArrowLeft?: () => void
	ArrowRight?: () => void
	Enter?: () => void
	Escape?: () => void
}

export function useKeys(keyActions: KeyActions, enabled: boolean = true) {
	useEffect(() => {
		if (!enabled) return

		const keyMap: Record<string, (() => void) | undefined> = {
			ArrowUp: keyActions.ArrowUp,
			ArrowDown: keyActions.ArrowDown,
			ArrowLeft: keyActions.ArrowLeft,
			ArrowRight: keyActions.ArrowRight,
			Enter: keyActions.Enter,
			Escape: keyActions.Escape,
		}

		const handleKeyPress = (event: KeyboardEvent) => {
			const action = keyMap[event.key]
			if (action) action()
		}

		document.addEventListener('keydown', handleKeyPress)

		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [keyActions, enabled])
}

// Use wheel to call a function when the user scrolls
export function useScroll(
	{
		ScrollUp,
		ScrollDown,
	}: {
		ScrollUp?: () => void
		ScrollDown?: () => void
	},
	enabled: boolean = true
) {
	const threshold = 0
	useEffect(() => {
		if (!enabled) return

		const handleWheel = (event: WheelEvent) => {
			// check scroll direction
			if (event.deltaY > threshold && ScrollDown) {
				ScrollDown()
			} else if (event.deltaY < -threshold && ScrollUp) {
				ScrollUp()
			}
		}

		document.addEventListener('wheel', handleWheel)

		return () => {
			document.removeEventListener('wheel', handleWheel)
		}
	}, [ScrollUp, ScrollDown, threshold, enabled])
}

// Use swipe to call a function when the user swipes
export function useSwipe(
	{
		SwipeLeft,
		SwipeRight,
		SwipeUp,
		SwipeDown,
	}: {
		SwipeLeft?: () => void
		SwipeRight?: () => void
		SwipeUp?: () => void
		SwipeDown?: () => void
	},
	enabled: boolean = true
) {
	const threshold = 50
	useEffect(() => {
		if (!enabled) return

		let touchStartX = 0
		let touchStartY = 0

		const handleTouchStart = (event: TouchEvent) => {
			touchStartX = event.touches[0].clientX
			touchStartY = event.touches[0].clientY
		}

		const handleTouchEnd = (event: TouchEvent) => {
			const touchEndX = event.changedTouches[0].clientX
			const touchEndY = event.changedTouches[0].clientY

			const swipeDistanceX = touchEndX - touchStartX
			const swipeDistanceY = touchEndY - touchStartY

			if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
				// horizontal swipe
				if (swipeDistanceX > threshold && SwipeRight) {
					SwipeRight()
				} else if (swipeDistanceX < -threshold && SwipeLeft) {
					SwipeLeft()
				}
			} else {
				// vertical swipe
				if (swipeDistanceY > threshold && SwipeDown) {
					SwipeDown()
				} else if (swipeDistanceY < -threshold && SwipeUp) {
					SwipeUp()
				}
			}
		}

		document.addEventListener('touchstart', handleTouchStart)
		document.addEventListener('touchend', handleTouchEnd)

		return () => {
			document.removeEventListener('touchstart', handleTouchStart)
			document.removeEventListener('touchend', handleTouchEnd)
		}
	}, [SwipeLeft, SwipeRight, SwipeUp, SwipeDown, threshold, enabled])
}

// Use popstate to call a function when the user navigates
export function usePopState(callback: () => void) {
	useEffect(() => {
		const handlePopState = () => {
			callback()
		}

		window.addEventListener('popstate', handlePopState)
		return () => {
			window.removeEventListener('popstate', handlePopState)
		}
	}, [callback])
}
