'use client'
// modules
import { useEffect, useState, SyntheticEvent } from 'react'
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
import ArwFlex from '@/components/arw/ArwFlex'
// lib
import { debug } from '@/lib/utils/dev'
import { useDebounce } from '@/lib/utils/hooks'
import { Option } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function ArwSelect({
	onValueChange,
	children,
	options,
	defaultValue,
	placeholder,
	className,
	center,
	search,
}: {
	onValueChange: (value: any) => void
	children?: React.ReactNode
	options: Option[]
	defaultValue?: string
	placeholder?: string
	className?: string
	center?: boolean
	search?: boolean
}) {
	debug(9, 9, options)

	const [searchTerm, setSearchTerm] = useState('')
	const [filteredOptions, setFilteredOptions] = useState(options)
	const [selectedValue, setSelectedValue] = useState(defaultValue)

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
	const debouncedHandleSearch = useDebounce(handleSearch, 500)

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

	const handleStopPrapagation = (e: SyntheticEvent) => {
		debug(9, 9, e)
		e.stopPropagation()
	}

	const handlePreventDefault = (e: SyntheticEvent) => {
		debug(9, 9, e)
		e.preventDefault()
	}

	useEffect(() => {
		const selectedOption = options.find(
			(option) => option.value === selectedValue
		)
		if (selectedOption && !filteredOptions.includes(selectedOption)) {
			setFilteredOptions((prevOptions) => [...prevOptions, selectedOption])
		}
	}, [selectedValue, options, filteredOptions])

	useEffect(() => {
		setFilteredOptions(options)
		setSelectedValue(defaultValue)
	}, [options, defaultValue])

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
			<SelectContent
				// ref={(ref) => {
				// 	if (!ref) return
				// 	ref.ontouchstart = (e) => {
				// 		e.preventDefault()
				// 	}
				// }}
			>
				<ArwFlex className="p-2 gap-2">
					{search && (
						<Input
							type="text"
							value={searchTerm}
							onChange={handleSearchChange}
							onKeyDown={handleStopPrapagation}
							onTouchStart={handleStopPrapagation}
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
					{children}
				</ArwFlex>
			</SelectContent>
		</Select>
	)
}
