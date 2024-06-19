'use client'
// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import ArwTitle from '@/components/arw/ArwTitle'
import ArwFlex from '@/components/arw/ArwFlex'
// lib
import { Option } from '@/lib/types'

export default function OptionsDialog({
	isOpen,
	options,
	handleClose,
}: {
	isOpen: boolean
	options: Option[]
	handleClose: () => void
}) {
	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent>
				<ArwTitle accent>Manage options</ArwTitle>
				<ArwFlex className="gap-2 mt-4">
					{options.map((option) => (
						<div key={option.value}>{option.label}</div>
					))}
				</ArwFlex>
			</DialogContent>
		</Dialog>
	)
}
