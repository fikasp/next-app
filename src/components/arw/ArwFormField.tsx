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
	className,
	control,
	name,
	render,
	label,
	center,
	grid,
}: {
	className?: string
	control: Control<any>
	name: string
	// eslint-disable-next-line no-unused-vars
	render: (props: { field: any }) => React.ReactNode
	label?: string
	center?: boolean
	grid?: boolean
}) {
	return (
		<FormField
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				return grid && label ? (
					<>
						<FormLabel
							className={cn(
								'flex items-center bg-base-100 dark:bg-base-800 p-4 rounded-md',
								center ? 'justify-center' : 'justify-start',
								className
							)}
						>
							{label}
						</FormLabel>
						<FormControl>{render({ field })}</FormControl>

						{fieldState.error && (
							<>
								<FormItem />
								<FormMessage
									className={cn(
										'flex items-center relative top-[-10px]',
										className
									)}
								/>
							</>
						)}
					</>
				) : (
					<FormItem className="flex flex-col gap-2">
						{label && (
							<FormLabel
								className={cn(
									'flex items-center',
									center ? 'justify-center' : 'justify-start',
									className
								)}
							>
								{label}
							</FormLabel>
						)}
						<FormControl>{render({ field })}</FormControl>
						<FormMessage
							className={cn('flex items-center text-center', className)}
						/>
					</FormItem>
				)
			}}
		/>
	)
}
