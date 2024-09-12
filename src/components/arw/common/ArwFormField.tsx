'use client'
// modules
import { When } from 'react-if'
// components
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useArwFormContext } from '@/components/arw/common/ArwForm'
// lib
import { FormFieldType } from '@/lib/types/enums'
import { cn } from '@/lib/utils'

interface FormFieldProps {
	children?: React.ReactNode
	className?: string
	disabled?: boolean
	label?: string
	name: string
	placeholder?: string
	// eslint-disable-next-line
	render?: (field: any) => React.ReactNode
	type?: FormFieldType
}

const RenderField = ({
	field,
	props,
}: {
	field: any
	props: FormFieldProps
}) => {
	const { center } = useArwFormContext()
	switch (props.type) {
		// Checkbox
		case FormFieldType.CHECKBOX:
			return (
				<FormControl>
					<FormItem
						className={cn(
							'flex items-center gap-2',
							center && 'justify-center'
						)}
					>
						<Checkbox
							checked={field.value}
							onCheckedChange={field.onChange}
							disabled={props.disabled}
							id={props.name}
						/>
						<Label htmlFor={props.name} className="cursor-pointer">
							{props.label}
						</Label>
					</FormItem>
				</FormControl>
			)

		// Input
		case FormFieldType.INPUT:
			return (
				<FormControl>
					<Input
						{...field}
						placeholder={props.placeholder}
						className={cn(center && 'text-center')}
						disabled={props.disabled}
					/>
				</FormControl>
			)

		// Select
		case FormFieldType.SELECT:
			return (
				<FormControl>
					<Select onValueChange={field.onChange} value={field.value}>
						<SelectTrigger>
							<SelectValue placeholder={props.placeholder} />
						</SelectTrigger>
						<SelectContent>{props.children}</SelectContent>
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
						disabled={props.disabled}
					/>
				</FormControl>
			)
		default:
			return props.render && props.render(field)
	}
}

export default function ArwFormField(props: FormFieldProps) {
	const { className, label, name, type } = props
	const { grid, center, control } = useArwFormContext()
	return (
		<FormField
			name={name}
			control={control!}
			render={({ field }) => {
				return (
					<FormItem
						className={cn(grid ? `grid ${grid}` : 'flex flex-col', 'gap-2')}
					>
						{/* Label */}
						<When condition={label && type != FormFieldType.CHECKBOX}>
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
