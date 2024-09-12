'use client'
// modules
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import {
	ArwFlex,
	ArwForm,
	ArwFormField,
	ArwSelect,
	ArwTitle,
} from '@/components/arw'
import { Button } from '@/components/ui/button'
// lib
import { generateUrl } from '@/lib/utils'
import { ICategory } from '@/lib/models/category.model'
import { Option } from '@/lib/types'
import { routes } from '@/lib/constants/paths'
import { searchSchema, SearchFormData } from '@/lib/types/zod'
import { debug } from '@/lib/utils/dev'
import { FormFieldType } from '@/lib/types/enums'

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
			center
			form={form}
			onSubmit={handleSubmit}
			className="grow justify-between gap-8"
		>
			<ArwTitle center accent>
				Search projects
			</ArwTitle>

			<ArwFlex>
				<ArwFormField
					type={FormFieldType.INPUT}
					placeholder="Enter a title"
					label="Title"
					name="title"
				/>
				<ArwFormField
					label="Category"
					name="category"
					render={(field) => (
						<ArwSelect
							onValueChange={field.onChange}
							placeholder="Select a category"
							options={categoryOptions}
							search
						/>
					)}
				/>
				<ArwFormField
					type={FormFieldType.CHECKBOX}
					label="Show only my projects"
					name="profile"
				/>
			</ArwFlex>
			<ArwFlex>
				<Button variant="accent">Search</Button>
			</ArwFlex>
		</ArwForm>
	)
}
