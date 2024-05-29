'use client'
// modules
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
import { cn } from '@/lib/utils'

export default function ArwFormField({
	control,
	name,
	render,
	label,
	grid,
}: {
	control: Control<any>
	name: string
	render: (props: { field: any }) => React.ReactNode
	label: string
	grid?: boolean
}) {
	// prettier-ignore
	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => {
				const content = (
					<>
						<FormLabel
							className={cn(
								'flex-center',
								grid && 'bg-base-100 dark:bg-base-800 p-2 rounded-md'
							)}
						>
							{label}
						</FormLabel>
						<FormControl>{render({ field })}</FormControl>						
						<FormMessage 
							className={cn(
								'text-center', 
								grid && 'col-span-2'
							)} />
					</>
				)
				return grid ? (
					content
				) : (
					<FormItem className="flex flex-col gap-2">{content}</FormItem>
				)
			}}
		/>
	)
}
