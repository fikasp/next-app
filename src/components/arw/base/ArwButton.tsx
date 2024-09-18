// components
import { Button } from '@/components/ui/button'

export default function ArwButton({
	children,
	isSubmitting,
	accent,
}: {
	children?: string
	isSubmitting?: boolean
	accent?: boolean
}) {
	return (
		<Button variant={accent ? 'accent' : 'default'} disabled={isSubmitting}>
			{children}
		</Button>
	)
}
