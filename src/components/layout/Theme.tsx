'use client'
// modules
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
// components
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// lib
import { useMobile } from '@/lib/utils/hooks'
import { ArwText } from '../arw'

export default function Theme({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { setTheme } = useTheme()
	const isMobile = useMobile()

	const handleClick = (theme: string) => () => {
		setTheme(theme)
		if (isMobile) {
			setOpen(false)
		}
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="hover:bg-transparent dark:hover:bg-transparent p-0 w-[35px] h-[20px] relative"
				>
					<Sun className="absolute max-md:left-[-40px] h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute max-md:left-[-40px] h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<ArwText className="md:hidden">Theme</ArwText>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="text-center mt-2">
				<DropdownMenuItem
					className="flex-center"
					onClick={handleClick('light')}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem className="flex-center" onClick={handleClick('dark')}>
					Dark
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
