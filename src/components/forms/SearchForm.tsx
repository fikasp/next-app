'use client'
// modules
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import {
	ArwCheckbox,
	ArwFlex,
	ArwForm,
	ArwFormField,
	ArwSelect,
	ArwTitle,
} from '@/components/arw'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// lib
import { generateUrl } from '@/lib/utils'
import { ICategory } from '@/lib/models/category.model'
import { Option } from '@/lib/types'
import { routes } from '@/lib/constants/paths'
import { searchSchema, SearchFormData } from '@/lib/types/zod'
import { debug } from '@/lib/utils/dev'

export default function SearchForm({
	categories,
}: {
	categories: ICategory[]
}) {
	debug(8)
	const router = useRouter()
	const categoryOptions: Option[] = categories.map((category: ICategory) => ({
		value: category.label,
		label: category.label,
	}))

	const form = useForm<SearchFormData>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			title: '',
			category: '',
			profile: false,
		},
	})

	const handleSubmit = ({ title, category, profile }: SearchFormData) => {
		const queryParams: { [key: string]: string | undefined } = {}

		if (title) queryParams.title = title
		if (category) queryParams.category = category

		const route = profile ? routes.PROFILE : routes.PROJECTS
		const url = generateUrl([route], queryParams)
		router.push(url)
	}

	return (
		<ArwForm
			form={form}
			onSubmit={handleSubmit}
			className="grow justify-between gap-8"
		>
			<ArwTitle center accent>
				Search projects
			</ArwTitle>

			<ArwFlex>
				<ArwFormField
					label="Title"
					name="title"
					className="justify-center"
					control={form.control}
					render={({ field }) => (
						<Input
							placeholder="Enter a title"
							className="text-center"
							{...field}
						/>
					)}
				/>
				<ArwFormField
					control={form.control}
					label="Category"
					name="category"
					className="justify-center"
					render={({ field }) => (
						<ArwSelect
							onValueChange={field.onChange}
							placeholder="Select a category"
							options={categoryOptions}
							search
							center
						/>
					)}
				/>
				<ArwFormField
					name="profile"
					label="My profile"
					className="justify-center"
					control={form.control}
					render={({ field }) => (
						<ArwCheckbox
							checked={field.value}
							onCheckedChange={field.onChange}
							label="Show only my projects"
						/>
					)}
				/>
			</ArwFlex>
			<ArwFlex>
				<Button variant="accent">Search</Button>
			</ArwFlex>
		</ArwForm>
	)
}
