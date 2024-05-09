// modules
import Link from 'next/link'
// components
import { Button } from '@/components/ui/button'

export default function Item({ id }: { id: string }) {
	return (
		<div className="container flex-center flex-col p-4">
			<div>Item no. {id}</div>
			<div className="mt-4">
				<Link href="/items">
					<Button variant="secondary">Back</Button>
				</Link>
			</div>
		</div>
	)
}
