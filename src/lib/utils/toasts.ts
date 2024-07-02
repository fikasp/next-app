// components
import { toast } from '@/components/ui/use-toast'

export function toastArw(message: string) {
	toast({
		description: message,
	})
}

export function toastError(messageOrMessages: string | string[]) {
	if (Array.isArray(messageOrMessages)) {
		messageOrMessages.forEach((message) => {
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
			description: messageOrMessages,
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
