// modules
import { useRef, useCallback } from 'react'

// Use debounce to delay the execution of a function
export function useDebounce(
	func: (...args: any[]) => void,
	wait: number
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
