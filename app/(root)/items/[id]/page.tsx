import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Task({ params }: any) {
	return (
		<div className="container flex-center flex-col p-4">
			<div>Item no. {params.id}</div>
			<div className="mt-4">
				<Link href="/items">
					<Button variant="secondary">Back</Button>
				</Link>
			</div>
		</div>
	)
}
