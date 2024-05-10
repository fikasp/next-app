'use client'
// modules
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ArwForm from '@/components/shared/forms/ArwForm'
import ArwGroup from '@/components/shared/containers/ArwGroup'
import ArwInput from '@/components/shared/forms/ArwInput'
import ArwTextArea from '@/components/shared/forms/ArwTextArea'
import ArwTitle from '@/components/shared/common/ArwTitle'
// lib
import { ItemFormData, itemSchema } from '@/lib/zod'

export default function ItemForm() {
	const { toast } = useToast()
	// Form
	const form = useForm<ItemFormData>({
		resolver: zodResolver(itemSchema),
		defaultValues: {
			title: '',
			description: '',
		},
	})

	// Action
	const onSubmit = async (data: ItemFormData) => {
		console.log(data)
		toast({
			title: "Item added!",
			description: `You've successfully added ${data.title}`,
		})
	}

	return (
		// prettier-ignore
		<ArwForm form={form} onSubmit={onSubmit} className="grow justify-between gap-8">
			<ArwTitle>Add new item</ArwTitle>
			<ArwGroup className="gap-8">
				<ArwInput 
					control={form.control} 
					name="title"
					label="Title" 
				/>
				<ArwTextArea
					control={form.control}
					name="description"
					label="Description"
				/>
			</ArwGroup>
			<Button variant="accent">
				Add item
			</Button>
		</ArwForm>
	)
}
