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
import { txt } from '@/lib/constants/texts'

export default function NavTheme() {
	const { setTheme } = useTheme()

	const handleClick = (theme: string) => () => {
		setTheme(theme)
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex gap-2 cursor-pointer hover:text-accent">
					<div className="flex-center">
						<ArwIcon icon={Icons.Sun} className="flex dark:hidden" />
						<ArwIcon icon={Icons.Moon} className="hidden dark:flex" />
					</div>
					<div className="md:hidden">{txt.menu.THEME}</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="text-center mt-2">
				<DropdownMenuItem
					className="flex-start gap-1"
					onClick={handleClick(Themes.LIGHT)}
				>
					<ArwIcon icon={Icons.Sun} /> {txt.menu.THEME_LIGHT}
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex-center gap-1"
					onClick={handleClick(Themes.DARK)}
				>
					<ArwIcon icon={Icons.Moon} /> {txt.menu.THEME_DARK}
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex-center"
					onClick={handleClick(Themes.SYSTEM)}
				>
					{txt.menu.THEME_SYSTEM}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
