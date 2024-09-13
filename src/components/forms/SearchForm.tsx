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
	ArwSubmit,
	ArwTitle,
} from '@/components/arw'
// lib
import { debug } from '@/lib/utils/dev'
import { FormFieldType } from '@/lib/types/enums'
import { generateUrl, getBaseRoute } from '@/lib/utils'
import { ICategory } from '@/lib/models/category.model'
import { searchFormSchema, SearchFormValues } from '@/lib/types/zod'
import { Option, QueryParams } from '@/lib/types'

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

	// Form
	const form = useForm<SearchFormValues>({
		resolver: zodResolver(searchFormSchema),
		defaultValues: {
			title: '',
			category: '',
			profile: false,
		},
	})

	// Submit
	const handleSubmit = (searchFormValues: SearchFormValues) => {
		const { title, category, profile } = searchFormValues
		const queryParams: QueryParams = {}

		if (title) queryParams.title = title
		if (category) queryParams.category = category

		const route = getBaseRoute(profile)
		const url = generateUrl([route], queryParams)
		router.push(url)
	}

	return (
		<ArwForm<SearchFormValues>
			form={form}
			onSubmit={handleSubmit}
			className="grow justify-between gap-8"
			center
		>
			{/* Title */}
			<ArwTitle accent center>
				Search projects
			</ArwTitle>

			{/* Fields */}
			<ArwFlex>
				<ArwFormField<SearchFormValues>
					type={FormFieldType.INPUT}
					placeholder="Enter a title"
					label="Title"
					name="title"
				/>
				<ArwFormField<SearchFormValues>
					type={FormFieldType.SELECT}
					options={categoryOptions}
					placeholder="Select a category"
					label="Category"
					name="category"
				/>
				<ArwFormField<SearchFormValues>
					type={FormFieldType.CHECKBOX}
					label="Show only my projects"
					name="profile"
				/>
			</ArwFlex>

			{/* Submit*/}
			<ArwSubmit accent>Search</ArwSubmit>
		</ArwForm>
	)
}
