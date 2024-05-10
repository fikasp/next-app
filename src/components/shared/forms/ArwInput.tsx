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
import { Input } from '@/components/ui/input'
// lib
import { cn } from '@/lib/utils'

export default function ArwInput({
	control,
	className,
	name,
	label,
	placeholder = label,
	type = 'text',
}: {
	control: Control<any>
	className?: string
	name: string
	label: string
	placeholder?: string
	type?: string
}) {
	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem className="flex flex-col items-center">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							type={type}
							placeholder={placeholder}
							className={cn(
								'text-center arw-bg-inputs border-accent dark:border-accent',
								className
							)}
							{...field}
						/>
					</FormControl>
					<FormMessage className="text-xs" />
				</FormItem>
			)}
		/>
	)
}
