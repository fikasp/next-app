import { toast } from '@/components/ui/use-toast'
import { msg } from '../constants'

export function toastArw(message: string) {
	toast({
		description: message,
	})
}

export function toastError(message: string) {
	toast({
		title: 'Error!',
		variant: 'error',
		description: message,
	})
}

export function toastErrors(messages: string[]) {
	messages.forEach((message) => {
		toast({
			title: 'Error!',
			variant: 'error',
			description: message,
		})
	})
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
