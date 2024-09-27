'use client'
// modules
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArwIcon } from '@/components/arw'
// lib
import { Icons, SortOptions } from '@/lib/types/enums'
import { txt } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function NavSorting() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const currentSort =
		(searchParams.get('sort') as SortOptions) || SortOptions.CUSTOM
	const [sortBy, setSortBy] = useState<SortOptions>(currentSort)

	useEffect(() => {
		setSortBy(currentSort)
	}, [currentSort])

	const handleClick = (sortOption: SortOptions) => () => {
		const params = new URLSearchParams(searchParams.toString())
		if (sortOption === SortOptions.CUSTOM) {
			params.delete('sort')
		} else {
			params.set('sort', sortOption)
		}
		const url = `?${params.toString()}`
		router.push(url)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex-center cursor-pointer hover:text-accent gap-2 md:gap-1">
					<div className="flex-center">
						<ArwIcon icon={Icons.ArrowDownUp} />
					</div>
					<div className="md:hidden">{txt.menu.SORT_OPTIONS}</div>
					<div className="max-lg:hidden">{txt.menu.SORT}</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="text-center mt-2">
				<DropdownMenuItem
					className={cn(sortBy === SortOptions.CUSTOM && 'font-bold')}
					onClick={handleClick(SortOptions.CUSTOM)}
				>
					{txt.menu.SORT_CUSTOM}
				</DropdownMenuItem>
				<DropdownMenuItem
					className={cn(sortBy === SortOptions.DATE && 'font-bold')}
					onClick={handleClick(SortOptions.DATE)}
				>
					{txt.menu.SORT_DATE}
				</DropdownMenuItem>
				<DropdownMenuItem
					className={cn(sortBy === SortOptions.USER && 'font-bold')}
					onClick={handleClick(SortOptions.USER)}
				>
					{txt.menu.SORT_USER}
				</DropdownMenuItem>
				<DropdownMenuItem
					className={cn(sortBy === SortOptions.TITLE && 'font-bold')}
					onClick={handleClick(SortOptions.TITLE)}
				>
					{txt.menu.SORT_TITLE}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
