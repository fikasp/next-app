'use client'
// modules
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
// components
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwForm from '@/components/arw/ArwForm'
import ArwFormField from '@/components/arw/ArwFormField'
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import { checkUserMode, generateUrl } from '@/lib/utils'
import { SearchFormData } from '@/lib/types'
import { searchSchema } from '@/lib/zod'
import { routes } from '@/navigation'

export default function SearchForm() {
	const router = useRouter()

	const form = useForm<SearchFormData>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			title: '',
			userMode: false,
		},
	})

	const onSubmit = (searchFormData: SearchFormData) => {
		const queryParams = {
			title: searchFormData.title,
			...(searchFormData.userMode ? { user: 'current' } : {}),
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

			<ArwFlex>
				<ArwFormField
					control={form.control}
					name="title"
					className="justify-center"
					render={({ field }) => (
						<Input placeholder="Title" className="text-center" {...field} />
					)}
				/>
				<FormField
					control={form.control}
					name="userMode"
					render={({ field }) => (
						<FormItem className="flex-center items-start gap-2 rounded-md border border-base-100 dark:border-base-600 p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>Search only in my items</FormLabel>
						</FormItem>
					)}
				/>
			</ArwFlex>
			<ArwFlex>
				<Button variant="accent">Search</Button>
			</ArwFlex>
		</ArwForm>
	)
}
