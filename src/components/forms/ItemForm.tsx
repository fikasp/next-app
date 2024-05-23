'use client'
// modules
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
// components
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ArwForm from '@/components/forms/ArwForm'
import ArwGroup from '@/components/shared/ArwGroup'
import ArwInput from '@/components/forms/ArwInput'
import ArwTextArea from '@/components/forms/ArwTextArea'
import ArwTitle from '@/components/shared/ArwTitle'
// database
import { createItem, updateItem } from '@/database/actions/item.action'
import { IItem } from '@/database/models/item.model'
// lib
import { ItemFormData, itemSchema } from '@/lib/zod'
import { routes } from '@/navigation'
import Link from 'next/link'

export default function ItemForm({ item }: { item?: IItem }) {
	const { toast } = useToast()
	const router = useRouter()

	const defaultValues: ItemFormData = {
		title: '',
		info: '',
	}

	const initialValues: ItemFormData = item
		? {
				title: item.title,
				info: item.info,
			}
		: defaultValues

	// Form
	const form = useForm<ItemFormData>({
		resolver: zodResolver(itemSchema),
		defaultValues: initialValues,
	})

	// Action
	const onSubmit = async (itemFormData: ItemFormData) => {
		console.log(itemFormData)
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
			router.push(routes.ITEMS)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		// prettier-ignore
		<ArwForm 
			form={form} 
			onSubmit={onSubmit} 
			className="grow justify-between gap-8"
		>
			<ArwTitle className="arw-text-accent">
				{item ? "Update item" : "Add new item"}
			</ArwTitle>
			
			<ArwGroup className="gap-8">
				<ArwInput 
					control={form.control} 
					name="title"
					label="Title" 
				/>
				<ArwTextArea
					control={form.control}
					name="info"
					label="Info"
				/>
			</ArwGroup>
			<ArwGroup>
				<Button variant="accent">
					{item ? "Update item" : "Add new item"}
				</Button>
				<Link href="/items">
					<Button className='w-full' variant='secondary'>Back to items list</Button>
				</Link>
			</ArwGroup>
		</ArwForm>
	)
}
