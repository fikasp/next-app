'use client'
// modules
import { useEffect, useState, SyntheticEvent } from 'react'
// components
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ArwFlex } from '@/components/arw'
// lib
import { cn } from '@/lib/utils'
import { debug } from '@/lib/utils/dev'
import { Option } from '@/lib/types/shared'
import { useDebounce } from '@/lib/utils/hooks'

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
	// eslint-disable-next-line no-unused-vars
	onValueChange: (value: any) => void
	children?: React.ReactNode
	options: Option[]
	defaultValue?: string
	placeholder?: string
	className?: string
	center?: boolean
	search?: boolean
}) {
	debug(0, 0, options)

	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredOptions, setFilteredOptions] = useState(options)
	const [selectedValue, setSelectedValue] = useState(defaultValue)

	const toggleOpen = () => setIsOpen(!isOpen)

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
		debug(0, 0, value)
		setSelectedValue(value)
		onValueChange(value)
	}

	const handleStopPropagation = (e: SyntheticEvent) => {
		debug(0, 0, e)
		e.stopPropagation()
	}

	useEffect(() => {
		setFilteredOptions(options)
	}, [options])

	return (
		<Select
			defaultValue={defaultValue}
			onValueChange={handleSelectChange}
			open={isOpen}
		>
			<SelectTrigger
				className={cn(
					'text-md py-6 px-3',
					!selectedValue && 'text-base-300 dark:text-base-500',
					center && 'flex-center gap-2 pl-9',
					className
				)}
				onClick={toggleOpen}
			>
				<SelectValue
					placeholder={placeholder ? placeholder : 'Select a value'}
				/>
			</SelectTrigger>
			<SelectContent
				onEscapeKeyDown={toggleOpen}
				onPointerDownOutside={toggleOpen}
			>
				<ArwFlex className="p-2 gap-2">
					{search && (
						<ArwFlex center>
							<Input
								type="text"
								value={searchTerm}
								onChange={handleSearchChange}
								onKeyDown={handleStopPropagation}
								className={cn(
									center && 'text-center',
									'w-full max-sm:w-[200px] text-sm p-2'
								)}
								placeholder="Search..."
							/>
						</ArwFlex>
					)}
					<ArwFlex className="gap-0">
						{filteredOptions.map((option) => (
							<SelectItem
								key={option.value}
								className={cn(center && 'flex-center pl-0')}
								onClick={toggleOpen}
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
