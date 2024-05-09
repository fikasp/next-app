// modules
import Link from 'next/link'
// components
import { Button } from '@/components/ui/button'
import ArwContainer from '@/components/shared/containers/ArwContainer'

export default function Item({ id }: { id: string }) {
	return (
		<ArwContainer className="flex-center flex-col p-4">
			<div>Item no. {id}</div>
			<div className="mt-4">
				<Link href="/items">
					<Button variant="secondary">Back</Button>
				</Link>
			</div>
		</ArwContainer>
	)
}
