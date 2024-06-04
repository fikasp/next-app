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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwForm from '@/components/arw/ArwForm'
import ArwFormField from '@/components/arw/ArwFormField'
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import { generateUrl } from '@/lib/utils'
import { routes } from '@/navigation'
import { SearchFormData } from '@/lib/types'
import { searchSchema } from '@/lib/zod'
import { SortOptions } from '@/lib/types/enums'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

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
						<FormItem className="flex-center items-start gap-2 rounded-md border border-base-200 dark:border-base-600 p-4">
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
				<FormField
					control={form.control}
					name="sort"
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="flex-center gap-2 p-6 pl-10 font-medium">
										<SelectValue placeholder="Select a value" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem
										className="flex-center pl-0"
										value={SortOptions.TITLE}
									>
										Sort by title
									</SelectItem>
									<SelectItem
										className="flex-center pl-0"
										value={SortOptions.USER}
									>
										Sort by users
									</SelectItem>
									<SelectItem
										className="flex-center pl-0"
										value={SortOptions.DATE}
									>
										Sort by date
									</SelectItem>
								</SelectContent>
							</Select>
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
