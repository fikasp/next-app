'use client'
// modules
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
// components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwForm from '@/components/arw/ArwForm'
import ArwFormField from '@/components/arw/ArwFormField'
import ArwGrid from '@/components/arw/ArwGrid'
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import { createItem, updateItem } from '@/lib/actions/item.action'
import { IItem } from '@/lib/models/item.model'
import { itemSchema } from '@/lib/zod'
import { ItemFormData } from '@/lib/types'
import { routes } from '@/navigation'

export default function ItemForm({
	item,
	close,
}: {
	item?: IItem
	close?: () => void
}) {
	const { toast } = useToast()
	const router = useRouter()

	const defaultValues: ItemFormData = {
		title: '',
		info: '',
	}

	const initialValues: ItemFormData = item
		? { title: item.title, info: item.info }
		: defaultValues
	// Form
	const form = useForm<ItemFormData>({
		resolver: zodResolver(itemSchema),
		defaultValues: initialValues,
	})

	// Action
	const onSubmit = async (itemFormData: ItemFormData) => {
		try {
			if (item) {
				// Update item
				const updatedItem = await updateItem(item.slug, itemFormData)
				if (updatedItem) {
					toast({
						title: 'Item updated!',
						description: `${itemFormData.title} is successfully updated`,
					})
				}
				if (close) {
					close()
				}
			} else {
				// Create item
				const newItem = await createItem(itemFormData)
				if (newItem) {
					toast({
						title: 'Item added!',
						description: `${itemFormData.title} is successfully added`,
					})
				}
			}
		} catch (err) {
			console.error(err)
		}
		router.push(routes.ITEMS)
	}

	return (
		// prettier-ignore
		<ArwForm 
			form={form} 
			onSubmit={onSubmit} 
			className="grow justify-between gap-8"
		>
			<ArwTitle center accent>
				{item ? "Update item" : "Add new item"}
			</ArwTitle>
			
			<ArwFlex>
				<ArwFormField
					control={form.control} 
					name="title"
					label="Title" 
					render={({ field }) => (
						<Input
							placeholder="Title"
							className="text-center"
							{...field}
						/>
					)}
				/>
				<ArwFormField
					control={form.control} 
					name="info"
					label="Info" 
					render={({ field }) => (
						<Input
							placeholder="Info"
							className="text-center"
							{...field}
						/>
					)}
				/>
			</ArwFlex>
			<ArwFlex>
				<Button variant="accent">
					{item ? "Update item" : "Add new item"}
				</Button>
			</ArwFlex>
		</ArwForm>
	)
}
