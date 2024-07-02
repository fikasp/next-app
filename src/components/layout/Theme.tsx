'use client'
// modules
import { Moon, Sun } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import { useTheme } from 'next-themes'
// components
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Theme({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { setTheme } = useTheme()
	const isMobile = useMediaQuery({ maxWidth: 768 })

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
					className="hover:bg-transparent dark:hover:bg-transparent p-0 w-[35px] h-[20px]"
				>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
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
