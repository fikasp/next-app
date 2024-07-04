// components
import { toast } from '@/components/ui/use-toast'
import { toStringArray } from '@/lib/utils'

export function toastError(
	data: string | string[] | { [key: string]: string }
) {
	toStringArray(data).forEach((msg) => {
		toast({
			title: 'Error!',
			variant: 'error',
			description: msg,
		})
	})
}

export function toastWarning(
	data: string | string[] | { [key: string]: string }
) {
	toStringArray(data).forEach((msg) => {
		toast({
			title: 'Warning!',
			variant: 'warning',
			description: msg,
		})
	})
}

export function toastSuccess(
	data: string | string[] | { [key: string]: string }
) {
	toStringArray(data).forEach((msg) => {
		toast({
			title: 'Success!',
			variant: 'success',
			description: msg,
		})
	})
}
