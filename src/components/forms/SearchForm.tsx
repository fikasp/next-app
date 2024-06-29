'use client'
// modules
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
// components
import ArwTitle from '@/components/arw/ArwTitle'
import ArwSelect from '@/components/arw/ArwSelect'
import ArwForm from '@/components/arw/ArwForm'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwCheckbox from '@/components/arw/ArwCheckbox'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
// lib
import { generateUrl } from '@/lib/utils'
import { ICategory } from '@/lib/models/category.model'
import { routes } from '@/navigation'
import { searchSchema, SearchFormData } from '@/lib/types/zod'
import { sortOptions } from '@/lib/constants'
import { SortOptions } from '@/lib/types/enums'
import { debug } from '@/lib/utils/dev'
import { Option } from '@/lib/types'

export default function SearchForm({
	categories,
}: {
	categories: ICategory[]
}) {
	debug(7)
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
