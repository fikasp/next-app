// components
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormLabel, FormItem } from '@/components/ui/form'

export default function ArwCheckbox({
	label,
	checked,
	onCheckedChange,
}: {
	label: string
	checked: boolean
	onCheckedChange: (checked: boolean) => void
}) {
	return (
		<FormItem className="flex-center items-start gap-2 rounded-md border border-base-200 dark:border-base-600 p-4">
			<FormControl>
				<Checkbox checked={checked} onCheckedChange={onCheckedChange} />
			</FormControl>
			<FormLabel>{label}</FormLabel>
		</FormItem>
	)
}
