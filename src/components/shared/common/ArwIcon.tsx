'use client'
// modules
import { ReactSVG } from 'react-svg'

export default function ArwIcon({
	src,
	className,
}: {
	src: string
	className?: string
}) {
	return <ReactSVG src={src} className={className} />
}
