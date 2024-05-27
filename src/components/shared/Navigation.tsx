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
		if (prev) {
			router.push(prev)
		}
	}
	const handleNextClick = () => {
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

		document.addEventListener('keydown', handleKeyPress)

		return () => {
			document.removeEventListener('keydown', handleKeyPress)
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
