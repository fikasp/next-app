// modules
import Link from 'next/link'
// components
import { Button } from '@/components/ui/button'
import ArwContainer from '@/components/shared/ArwContainer'
import ArwPaper from '@/components/shared/ArwPaper'
import ArwTitle from '@/components/shared/ArwTitle'
// database
import { getItemBySlug } from '@/database/actions/item.action'
import { IItem } from '@/database/models/item.model'

export default async function ItemDetailsPage({ slug }: { slug: string }) {
	const item: IItem = await getItemBySlug(slug)

	return (
		<ArwContainer className="flex flex-col grow">
			<ArwPaper className="flex-between grow bg-accent-200 dark:bg-accent-900">
				<ArwTitle>{item.title}</ArwTitle>
				<div>{item.info}</div>
				<div className="mt-4">
					<Link href="/items">
						<Button>Back</Button>
					</Link>
				</div>
			</ArwPaper>
		</ArwContainer>
	)
}