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
	// eslint-disable-next-line no-unused-vars
	onCheckedChange: (checked: boolean) => void
}) {
	return (
		<FormItem className="arw-input flex-center items-start gap-2 rounded-md p-3">
			<FormControl>
				<Checkbox
					checked={checked}
					onCheckedChange={onCheckedChange}
					role="checkbox"
				/>
			</FormControl>
			<FormLabel className="text-md">{label}</FormLabel>
		</FormItem>
	)
}
