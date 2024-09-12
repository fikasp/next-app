'use client'
// modules
import { When } from 'react-if'
import { Control } from 'react-hook-form'
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
import { cn } from '@/lib/utils'

export default function ArwFormField({
	className,
	control,
	name,
	render,
	label,
}: {
	className?: string
	control: Control<any>
	name: string
	// eslint-disable-next-line no-unused-vars
	render: (field: any) => React.ReactNode
	label?: string
}) {
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
							<FormControl>{render(field)}</FormControl>
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
