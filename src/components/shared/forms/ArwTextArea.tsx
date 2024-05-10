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
import { Textarea } from '@/components/ui/textarea'
// lib
import { cn } from '@/lib/utils'

export default function ArwTextArea({
	control,
	className,
	name,
	label,
	placeholder = label,
}: {
	control: Control<any>
	className?: string
	name: string
	label: string
	placeholder?: string
}) {
	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem className="flex flex-col items-center">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea
							placeholder={placeholder}
							className={cn(
								'bg-form-bg border-none shadow text-center text-form-text placeholder:text-form-placeholder',
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
