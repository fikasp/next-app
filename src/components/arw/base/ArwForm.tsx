'use client'
// modules
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { createContext, useContext } from 'react'
// components
import { Form } from '@/components/ui/form'
// lib
import { cn } from '@/lib/utils'

type FormContextType<T extends FieldValues> = {
	control: UseFormReturn<T>['control'] | null
	center?: boolean
	grid?: string
}
const defaultContextValue: FormContextType<any> = {
	control: null,
	center: false,
	grid: '',
}

const ArwFormContext = createContext<FormContextType<any>>(defaultContextValue)

export const useArwFormContext = <T extends FieldValues>() =>
	useContext(ArwFormContext) as FormContextType<T>

export default function ArwForm<T extends FieldValues>({
	children,
	className,
	onSubmit,
	form,
	grid,
	center,
	row,
}: {
	children: React.ReactNode
	className?: string
	// eslint-disable-next-line
	onSubmit: (data: T) => void
	form: UseFormReturn<T>
	grid?: string
	center?: boolean
	row?: boolean
}) {
	return (
		<Form {...form}>
			<ArwFormContext.Provider value={{ grid, center, control: form.control }}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn('flex gap-4', row ? '' : 'flex-col', className)}
				>
					{children}
				</form>
			</ArwFormContext.Provider>
		</Form>
	)
}
