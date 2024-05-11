import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm ring-offset-white placeholder:text-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-base-950 dark:placeholder:text-base-500 dark:focus-visible:ring-base-300 bg-base-50 dark:bg-base-800',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Textarea.displayName = 'Textarea'

export { Textarea }
