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
		<FormItem className="arw-input flex-center items-start gap-2 rounded-md p-4 ">
			<FormControl>
				<Checkbox checked={checked} onCheckedChange={onCheckedChange} />
			</FormControl>
			<FormLabel>{label}</FormLabel>
		</FormItem>
	)
}
