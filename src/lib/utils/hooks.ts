// modules
import { useRef, useCallback } from 'react'
import { useMediaQuery } from 'react-responsive'

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