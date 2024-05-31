'use client'
// modules
import qs from 'query-string'
import { useRouter } from 'next/navigation'
// components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import ArwFlex from '@/components/arw/ArwFlex'

import ArwTitle from '@/components/arw/ArwTitle'
// lib
import { IItem } from '@/lib/models/item.model'

import { routes } from '@/navigation'
import { useState } from 'react'

export default function SearchForm({
	item,
	close,
}: {
	item?: IItem
	close?: () => void
}) {
	const router = useRouter()
	const [title, setTitle] = useState('')

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const url = qs.stringifyUrl({ url: routes.START, query: { title } })

		router.push(url)
	}

	return (
		<form className="flex flex-col justify-between grow" onSubmit={onSubmit}>
			<ArwTitle center accent>
				Search item
			</ArwTitle>
			<Input
				placeholder="Title"
				className="text-center"
				onChange={onChange}
				value={title}
			/>
			<ArwFlex>
				<Button variant="accent">Search</Button>
			</ArwFlex>
		</form>
	)
}
