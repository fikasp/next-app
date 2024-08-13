'use client'
// modules
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// lib
import { useMobile } from '@/lib/utils/hooks'

export default function MenuTheme({
	setOpen,
}: {
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { setTheme } = useTheme()
	const isMobile = useMobile()

	const handleClick = (theme: string) => () => {
		setTheme(theme)
		if (isMobile && setOpen) {
			setOpen(false)
		}
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex-center gap-2 cursor-pointer hover:text-accent">
					<div className="flex-center w-[35px]">
						<Sun className="flex dark:hidden" />
						<Moon className="hidden dark:flex" />
					</div>
					<div className="md:hidden">Theme</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="text-center mt-2">
				<DropdownMenuItem
					className="flex-center gap-1"
					onClick={handleClick('light')}
				>
					<Sun /> Light
				</DropdownMenuItem>
				<DropdownMenuItem className="flex-center gap-1" onClick={handleClick('dark')}>
					<Moon /> Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex-center"
					onClick={handleClick('system')}
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
