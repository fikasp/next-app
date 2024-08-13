'use client'
// modules
import { ReactSVG } from 'react-svg'

export default function ArwSVG({
	src,
	className,
	size = 24,
}: {
	src: string
	className?: string
	size?: number
}) {
	return (
		<ReactSVG
			src={src}
			className={className}
			beforeInjection={(svg) => {
				svg.setAttribute('style', `width: ${size}; height: ${size}`)
			}}
		/>
	)
}
