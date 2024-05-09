'use client'
// modules
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import { Button } from '@/components/ui/button'
import ArwForm from '@/components/shared/forms/ArwForm'
import ArwGroup from '@/components/shared/containers/ArwGroup'
import ArwTextArea from '@/components/shared/forms/ArwTextArea'
import ArwInput from '@/components/shared/forms/ArwInput'
// lib
import { ItemFormData, itemSchema } from '@/lib/zod'

export default function ItemForm() {
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
	}

	return (
		// prettier-ignore
		<ArwForm form={form} onSubmit={onSubmit} className="w-[300px] gap-8">
			<ArwGroup>
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
			<Button className="bg-form-bg hover:bg-form-hover shadow">
				Add item
			</Button>
		</ArwForm>
	)
}
