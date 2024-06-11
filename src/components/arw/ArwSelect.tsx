// components
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function ArwSelect({
	onValueChange,
	defaultValue,
	options,
}: {
	onValueChange: (value: any) => void
	defaultValue: any
	options: any[]
}) {
	return (
		<Select onValueChange={onValueChange} defaultValue={defaultValue}>
			<SelectTrigger className="flex-center gap-2 p-6 pl-10 font-medium text-sm">
				<SelectValue placeholder="Select a value" />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem
						key={option.value}
						className="flex-center pl-0"
						value={option.value}
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
