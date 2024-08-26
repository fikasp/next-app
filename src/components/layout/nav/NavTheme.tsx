'use client'
// modules
import { useTheme } from 'next-themes'
// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArwIcon } from '@/components/arw'
// lib
import { Icons, Themes } from '@/lib/types/enums'

export default function MenuTheme() {
	const { setTheme } = useTheme()

	const handleClick = (theme: string) => () => {
		setTheme(theme)
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex gap-2 cursor-pointer hover:text-accent">
					<div className="flex-center w-[35px]">
						<ArwIcon icon={Icons.Sun} className="flex dark:hidden" />
						<ArwIcon icon={Icons.Moon} className="hidden dark:flex" />
					</div>
					<div className="md:hidden">Theme</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="text-center mt-2">
				<DropdownMenuItem
					className="flex-center gap-1"
					onClick={handleClick(Themes.LIGHT)}
				>
					<ArwIcon icon={Icons.Sun} /> Light
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex-center gap-1"
					onClick={handleClick(Themes.DARK)}
				>
					<ArwIcon icon={Icons.Moon} /> Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex-center"
					onClick={handleClick(Themes.SYSTEM)}
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
