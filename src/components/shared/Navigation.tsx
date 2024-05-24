'use client'
// modules
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// components
import { Button } from '@/components/ui/button'
import ArwFlex from '@/components/arw/ArwFlex'

export default function Navigation({
	back,
	prev,
	next,
}: {
	back: string
	prev?: string | null
	next?: string | null
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
		router.push(back)
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
		<ArwFlex between row>
			<Button disabled={!prev} onClick={handlePrevClick}>
				Prev
			</Button>
			<Button onClick={handleBackClick}>Back</Button>
			<Button disabled={!next} onClick={handleNextClick}>
				Next
			</Button>
		</ArwFlex>
	)
}
