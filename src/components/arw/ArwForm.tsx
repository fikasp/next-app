// components
import { Form } from '@/components/ui/form'
// lib
import { cn } from '@/lib/utils'

export default function ArwForm({
	children,
	className,
	onSubmit,
	form,
	row,
}: {
	children: React.ReactNode
	className?: string
	onSubmit: any
	form: any
	row?: boolean
}) {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn('flex gap-4', row ? '' : 'flex-col', className)}
			>
				{children}
			</form>
		</Form>
	)
}
