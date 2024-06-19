'use client'
// components
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ArwTitle from '@/components/arw/ArwTitle'
import ArwFlex from '@/components/arw/ArwFlex'
// lib
import { Option } from '@/lib/types'

export default function OptionsDialog({ options }: { options: Option[] }) {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="outline" className="p-2 w-full">
					Manage options
				</Button>
			</DialogTrigger>
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
