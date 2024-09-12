'use client'
// modules
import { When } from 'react-if'
import { Control } from 'react-hook-form'
import Image from 'next/image'
// components
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
// lib
import { useArwFormContext } from './ArwForm'
import { FormFieldType } from '@/lib/types/enums'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface ArwFormFieldProps {
	children?: React.ReactNode
	className?: string
	control: Control<any>
	dateFormat?: string
	description?: string
	disabled?: boolean
	iconAlt?: string
	iconSrc?: string
	label?: string
	name: string
	placeholder?: string
	render?: (field: any) => React.ReactNode
	showTimeSelect?: boolean
	type?: FormFieldType
}

const RenderField = ({
	field,
	props,
}: {
	field: any
	props: ArwFormFieldProps
}) => {
	const { center } = useArwFormContext()
	switch (props.type) {
		// Checkbox
		case FormFieldType.CHECKBOX:
			return (
				<FormControl>
					<div className="flex items-center gap-3">
						<Checkbox
							checked={field.value}
							onCheckedChange={field.onChange}
							disabled={props.disabled}
							id={props.name}
						/>
						<Label
							htmlFor={props.name}
							className="text-xs font-thin text-zinc-200 leading-5 cursor-pointer"
						>
							{props.label}
						</Label>
					</div>
				</FormControl>
			)

		// Input
		case FormFieldType.INPUT:
			return (
				<div>
					{props.iconSrc && (
						<Image
							src={props.iconSrc}
							height={24}
							width={24}
							alt={props.iconAlt || 'icon'}
							className="ml-2"
							priority
						/>
					)}
					<FormControl>
						<Input
							{...field}
							placeholder={props.placeholder}
							className={cn(center ? 'text-center' : 'text-left')}
							disabled={props.disabled}
						/>
					</FormControl>
				</div>
			)

		// Select
		case FormFieldType.SELECT:
			return (
				<FormControl>
					<Select onValueChange={field.onChange} value={field.value}>
						<SelectTrigger className="shad-select-trigger">
							<SelectValue placeholder={props.placeholder} />
						</SelectTrigger>
						<SelectContent className="shad-select-content">
							{props.children}
						</SelectContent>
					</Select>
				</FormControl>
			)

		// Textarea
		case FormFieldType.TEXTAREA:
			return (
				<FormControl>
					<Textarea
						{...field}
						placeholder={props.placeholder}
						className="shad-textArea"
						disabled={props.disabled}
					/>
				</FormControl>
			)

		// case FormFieldType.PHONE:
		// 	return (
		// 		<FormControl>
		// 			<PhoneInput
		// 				defaultCountry="PL"
		// 				placeholder={props.placeholder}
		// 				international
		// 				withCountryCallingCode
		// 				value={field.value as E164Number | undefined}
		// 				onChange={field.onChange}
		// 				className="input-phone"
		// 			/>
		// 		</FormControl>
		// 	)

		// case FormFieldType.DATE_PICKER:
		// 	return (
		// 		<div className="flex rounded-md border border-dark-500 bg-dark-400">
		// 			<Image
		// 				src="/assets/icons/calendar.svg"
		// 				height={24}
		// 				width={24}
		// 				alt="user"
		// 				className="ml-2"
		// 			/>
		// 			<FormControl>
		// 				<ReactDatePicker
		// 					showTimeSelect={props.showTimeSelect ?? false}
		// 					selected={field.value}
		// 					onChange={(date: Date | null) => field.onChange(date)}
		// 					timeInputLabel="Time:"
		// 					dateFormat={props.dateFormat ?? 'MM/dd/yyyy'}
		// 					wrapperClassName="date-picker"
		// 					placeholderText={props.placeholder}
		// 				/>
		// 			</FormControl>
		// 		</div>
		// 	)

		default:
			return props.render && props.render(field)
	}
}

export default function ArwFormField(props: ArwFormFieldProps) {
	const { className, control, label, name } = props
	const { grid, center } = useArwFormContext()
	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => {
				return (
					<FormItem
						className={cn(grid ? `grid ${grid}` : 'flex flex-col', 'gap-2')}
					>
						{/* Label */}
						<When condition={label}>
							<FormLabel
								className={cn(
									'flex items-center',
									center ? 'justify-center text-center' : 'justify-start',
									className
								)}
							>
								{label}
							</FormLabel>
						</When>

						{/* Field */}
						<FormItem className={cn(grid && !label && 'col-span-2')}>
							<RenderField field={field} props={props} />
						</FormItem>

						{/* Message */}
						<FormMessage
							className={cn(
								'flex items-center',
								center ? 'justify-center text-center' : 'justify-start',
								grid ? (label ? 'col-start-2' : 'col-span-2') : '',
								className
							)}
						/>
					</FormItem>
				)
			}}
		/>
	)
}
