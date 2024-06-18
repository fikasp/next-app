'use client'
// modules
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
// components
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ArwFlex from '@/components/arw/ArwFlex'
// lib
import { debug } from '@/lib/utils/dev'
import { useDebounce } from '@/lib/utils/hooks'
import { Option } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function ArwSelect({
	onValueChange,
	defaultValue,
	className,
	placeholder,
	options,
	custom,
	search,
	center,
}: {
	onValueChange: (value: any) => void
	defaultValue?: string
	className?: string
	placeholder?: string
	options: Option[]
	custom?: boolean
	search?: boolean
	center?: boolean
}) {
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredOptions, setFilteredOptions] = useState(options)
	const [selectedValue, setSelectedValue] = useState(defaultValue)

	const isMobile = useMediaQuery({ maxWidth: 768 })

	// Handle search options
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

	// Handle search change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		debouncedHandleSearch(e.target.value)
	}

	// Handle select change
	const handleSelectChange = (value: string) => {
		setSelectedValue(value)
		onValueChange(value)
	}

	useEffect(() => {
		const selectedOption = options.find(
			(option) => option.value === selectedValue
		)
		if (selectedOption && !filteredOptions.includes(selectedOption)) {
			setFilteredOptions((prevOptions) => [...prevOptions, selectedOption])
		}
	}, [selectedValue, options, filteredOptions])

	return (
		<Select defaultValue={defaultValue} onValueChange={handleSelectChange}>
			<SelectTrigger
				className={cn(
					'text-md py-6 px-3',
					!selectedValue && 'text-base-300 dark:text-base-500',
					center && 'flex-center gap-2 pl-9',
					className
				)}
			>
				<SelectValue
					placeholder={placeholder ? placeholder : 'Select a value'}
				/>
			</SelectTrigger>
			<SelectContent>
				<ArwFlex className="p-2 gap-2">
					{search && (
						<Input
							type="text"
							value={searchTerm}
							onChange={handleSearchChange}
							onKeyDown={(e) => e.stopPropagation()}
							onClick={(e) => e.stopPropagation()}
							className={cn(center && 'text-center', 'w-full text-sm p-2')}
							placeholder="Search..."
						/>
					)}
					<ArwFlex className="gap-0">
						{filteredOptions.map((option) => (
							<SelectItem
								key={option.value}
								className={cn(center && 'flex-center pl-0')}
								value={option.value}
							>
								{option.label}
							</SelectItem>
						))}
					</ArwFlex>
					{custom && (
						<Button variant="outline" className="p-2 w-full">
							Manage options
						</Button>
					)}
				</ArwFlex>
			</SelectContent>
		</Select>
	)
}
