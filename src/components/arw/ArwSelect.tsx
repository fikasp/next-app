'use client'
// modules
import { useEffect, useState } from 'react'
// components
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
// lib
import { useDebounce } from '@/lib/utils/hooks'
import { Option } from '@/lib/types'
import ArwFlex from './ArwFlex'
import { cn } from '@/lib/utils'

export default function ArwSelect({
	onValueChange,
	defaultValue,
	className,
	options,
	search,
	center,
}: {
	onValueChange: (value: any) => void
	defaultValue: string
	className?: string
	options: Option[]
	search?: boolean
	center?: boolean
}) {
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredOptions, setFilteredOptions] = useState(options)

	const handleSearch = (term: string) => {
		if (term) {
			setFilteredOptions(
				options.filter((option) =>
					option.label.toLowerCase().includes(term.toLowerCase())
				)
			)
		} else {
			setFilteredOptions(options)
		}
	}
	const debouncedHandleSearch = useDebounce(handleSearch, 300)

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		debouncedHandleSearch(value)
		setSearchTerm(value)
	}

	useEffect(() => {
		setFilteredOptions(options)
	}, [options])

	return (
		<Select onValueChange={onValueChange} defaultValue={defaultValue}>
			<SelectTrigger
				className={cn(
					className,
					center && 'flex-center pl-10 gap-2',
					'font-medium'
				)}
			>
				<SelectValue placeholder="Select a value" />
			</SelectTrigger>
			<SelectContent>
				{search && (
					<ArwFlex className="p-2">
						<Input
							type="text"
							value={searchTerm}
							onChange={handleSearchChange}
							className={cn(center && 'text-center', 'w-full text-sm p-2')}
							placeholder="Search..."
						/>
					</ArwFlex>
				)}
				{filteredOptions.map((option) => (
					<SelectItem
						key={option.value}
						className={cn(center && 'flex-center pl-0')}
						value={option.value}
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
