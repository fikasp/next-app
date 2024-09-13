'use client'
// modules
import { createContext, useContext } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
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

/**
 * A generic form component that utilizes React Hook Form for form management.
 *
 * @template T - The type of the form values.
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the form.
 * @param {string} [props.className] - Optional additional class names for the form.
 * @param {(data: T) => void} props.onSubmit - The function to be called when the form is submitted.
 * @param {UseFormReturn<T>} props.form - The form object returned by the `useForm` hook from React Hook Form.
 * @param {string} [props.grid] - Optional grid class names for the form layout e.g. "grid-cols-[auto_auto]".
 * @param {boolean} [props.center] - Optional flag to center the form content.
 * @param {boolean} [props.row] - Optional flag to arrange the form fields in a row.
 *
 * @returns {JSX.Element} The rendered form component.
 */
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
