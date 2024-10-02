// components
import { toast } from '@/components/ui/use-toast'
import { toStringArray } from '@/lib/utils'
import { txt } from '@/lib/constants/texts'

export function toastError(
	data: string | string[] | { [key: string]: string }
) {
	toStringArray(data).forEach((msg) => {
		toast({
			title: txt.common.ERROR,
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
			title: txt.common.WARNING,
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
			title: txt.common.SUCCESS,
			variant: 'success',
			description: msg,
		})
	})
}
