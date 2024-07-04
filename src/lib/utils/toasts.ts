// components
import { toast } from '@/components/ui/use-toast'

export function toastArw(message: string) {
	toast({
		description: message,
	})
}

export function toastError(messages: string | string[]) {
	if (Array.isArray(messages)) {
		messages.forEach((message) => {
			toast({
				title: 'Error!',
				variant: 'error',
				description: message,
			})
		})
	} else {
		toast({
			title: 'Error!',
			variant: 'error',
			description: messages,
		})
	}
}

export function toastWarning(message: string) {
	toast({
		title: 'Warning!',
		variant: 'warning',
		description: message,
	})
}

export function toastSuccess(message: string) {
	toast({
		title: 'Success!',
		variant: 'success',
		description: message,
	})
}
