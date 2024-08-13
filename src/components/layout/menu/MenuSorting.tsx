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
import { cn } from '@/lib/utils'

export default function MenuSorting() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const currentSort =
		(searchParams.get('sort') as SortOptions) || SortOptions.TITLE
	const [sortBy, setSortBy] = useState<SortOptions>(currentSort)
	const sortLabel = `Sort by ${sortBy.toLowerCase()}`

	useEffect(() => {
		setSortBy(currentSort)
	}, [currentSort])

	const handleClick = (sortOption: SortOptions) => () => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('sort', sortOption)
		const url = `?${params.toString()}`
		router.push(url)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex-center cursor-pointer hover:text-accent max-md:gap-2">
					<div className="flex-center w-[35px]">
						<ArwIcon icon={Icons.ArrowDownUp} />
					</div>
					<div className="md:hidden">{sortLabel}</div>
					<div className="max-md:hidden">Sort</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="text-center mt-2">
				<DropdownMenuItem
					className={cn(sortBy === SortOptions.TITLE && 'font-bold')}
					onClick={handleClick(SortOptions.TITLE)}
				>
					Sort by title
				</DropdownMenuItem>
				<DropdownMenuItem
					className={cn(sortBy === SortOptions.USER && 'font-bold')}
					onClick={handleClick(SortOptions.USER)}
				>
					Sort by user
				</DropdownMenuItem>
				<DropdownMenuItem
					className={cn(sortBy === SortOptions.DATE && 'font-bold')}
					onClick={handleClick(SortOptions.DATE)}
				>
					Sort by date
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
