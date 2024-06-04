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
import { SearchFormData } from '@/lib/types'
import { searchSchema } from '@/lib/zod'
import { sortOptions } from '@/lib/constants'
import { SortOptions } from '@/lib/types/enums'
import { routes } from '@/navigation'

export default function SearchForm() {
	const router = useRouter()

	const form = useForm<SearchFormData>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			title: '',
			userMode: false,
			sort: SortOptions.TITLE,
		},
	})

	const onSubmit = (searchFormData: SearchFormData) => {
		const queryParams = {
			...(searchFormData.title ? { title: searchFormData.title } : {}),
			...(searchFormData.userMode ? { user: 'current' } : {}),
			sort: searchFormData.sort,
		}

		const url = generateUrl(
			searchFormData.userMode ? [routes.ITEMS] : [routes.START],
			queryParams
		)
		router.push(url)
	}

	return (
		<ArwForm
			form={form}
			onSubmit={onSubmit}
			className="grow justify-between gap-8"
		>
			<ArwTitle center accent>
				Search items
			</ArwTitle>

			<ArwFlex className="gap-6">
				<FormField
					name="title"
					control={form.control}
					render={({ field }) => (
						<Input placeholder="Title" className="text-center" {...field} />
					)}
				/>
				<FormField
					name="userMode"
					control={form.control}
					render={({ field }) => (
						<ArwCheckbox
							checked={field.value}
							onCheckedChange={field.onChange}
							label="Search only in my items"
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
