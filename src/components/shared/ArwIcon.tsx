'use client'
// modules
import { ReactSVG } from 'react-svg'

export default function ArwIcon({
	src,
	className,
	size,
}: {
	src: string
	className?: string
	size?: number
}) {
	return (
		<ReactSVG
			src={src}
			beforeInjection={(svg) => {
				svg.setAttribute('style', `width: ${size}; height: ${size}`)
			}}
			className={className}
		/>
	)
}
