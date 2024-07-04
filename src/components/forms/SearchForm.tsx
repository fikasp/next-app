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
	ArwSelect,
	ArwTitle,
} from '@/components/arw'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// lib
import { generateUrl } from '@/lib/utils'
import { ICategory } from '@/lib/models/category.model'
import { Option } from '@/lib/types/shared'
import { routes } from '@/lib/constants/paths'
import { searchSchema, SearchFormData } from '@/lib/types/zod'
import { sortOptions } from '@/lib/constants'
import { SortOptions } from '@/lib/types/enums'
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
			sort: SortOptions.TITLE,
		},
	})

	const handleSubmit = ({ title, category, sort, profile }: SearchFormData) => {
		const queryParams: { [key: string]: string | undefined } = {}

		if (title) queryParams.title = title
		if (category) queryParams.category = category
		if (sort !== SortOptions.TITLE) queryParams.sort = sort

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

			<ArwFlex className="gap-6">
				<FormField
					name="title"
					control={form.control}
					render={({ field }) => (
						<Input
							placeholder="Enter a title"
							className="text-center"
							{...field}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
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
				<FormField
					name="sort"
					control={form.control}
					render={({ field }) => (
						<ArwSelect
							options={sortOptions}
							onValueChange={field.onChange}
							defaultValue={field.value}
							center
						/>
					)}
				/>
				<FormField
					name="profile"
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
