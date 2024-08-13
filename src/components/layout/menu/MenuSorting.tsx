'use client'
// modules
import { useRouter } from 'next/navigation'
// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// lib
import { SortOptions } from '@/lib/types/enums'
import { useMobile } from '@/lib/utils/hooks'

export default function MenuSorting({
	setOpen,
}: {
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const isMobile = useMobile()
	const router = useRouter()

	const handleClick = (sortOption: SortOptions) => () => {
		const url = `projects?sort=${sortOption}`
		router.push(url)
		if (isMobile && setOpen) {
			setOpen(false)
		}
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex-center gap-2 cursor-pointer hover:text-accent">
					<div className="flex-center w-[35px]">Icon</div>
					<div className="md:hidden">Sort</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="text-center mt-2">
				<DropdownMenuItem
					className="flex-center"
					onClick={handleClick(SortOptions.TITLE)}
				>
					Sort by title
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex-center"
					onClick={handleClick(SortOptions.USER)}
				>
					Sort by user
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex-center"
					onClick={handleClick(SortOptions.DATE)}
				>
					Sort by date
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
