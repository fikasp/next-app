'use client'
// modules
import { createContext, useContext } from 'react'
// components
import { Form } from '@/components/ui/form'
// lib
import { ArwFormContextType } from '@/lib/types'
import { cn } from '@/lib/utils'

const defaultContextValue: ArwFormContextType = {
	control: null,
	center: false,
	grid: '',
}

const ArwFormContext = createContext<ArwFormContextType>(defaultContextValue)

export const useArwFormContext = () => useContext(ArwFormContext)

export default function ArwForm({
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
	onSubmit: any
	form: any
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
