'use client'
// modules
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
// components
import { ArwButton } from '@/components/arw'
// lib
import { Icons } from '@/lib/types/enums'

export default function NavClose({
	callback,
	className,
	size = 30,
	url,
}: {
	callback?: () => void
	url?: string | undefined | null
	className?: string
	size?: number
}) {
	const router = useRouter()

	const handleClose = useCallback(() => {
		if (callback) {
			callback()
		} else if (url) {
			router.push(url)
		} else {
			router.back()
		}
	}, [callback, url, router])

	useEffect(() => {
		window.addEventListener('popstate', handleClose)
		return () => {
			window.removeEventListener('popstate', handleClose)
		}
	}, [handleClose])

	return (
		<ArwButton
			icon={Icons.X}
			className={className}
			onClick={handleClose}
			size={size}
		/>
	)
}
