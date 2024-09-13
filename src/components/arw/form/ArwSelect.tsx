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
import { useArwFormContext } from '@/components/arw/form/ArwForm'
import { ArwFlex } from '@/components/arw'
// lib
import { cn } from '@/lib/utils'
import { debug } from '@/lib/utils/dev'
import { useDebounce } from '@/lib/utils/hooks'
import { Option } from '@/lib/types'
import { When } from 'react-if'
import CategoryDialog from '@/components/dialogs/CategoryDialog'

export default function ArwSelect({
	field,
	options,
	placeholder,
	className,
	manage,
	search,
}: {
	field: any
	options: Option[]
	placeholder?: string
	className?: string
	manage?: boolean
	search?: boolean
}) {
	debug(0, 0, options)

	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredOptions, setFilteredOptions] = useState(options)
	const { center } = useArwFormContext()

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

	const handleStopPropagation = (e: SyntheticEvent) => {
		debug(0, 0, e)
		e.stopPropagation()
	}

	useEffect(() => {
		setFilteredOptions(options)
	}, [options])

	return (
		<Select
			defaultValue={field.value}
			onValueChange={field.onChange}
			open={isOpen}
		>
			<SelectTrigger
				onClick={toggleOpen}
				className={cn(
					'arw-placeholder',
					center && 'flex-center gap-2 pl-8',
					className
				)}
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
					<When condition={manage}>
						<CategoryDialog options={options} />
					</When>
				</ArwFlex>
			</SelectContent>
		</Select>
	)
}
