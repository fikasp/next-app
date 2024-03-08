import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<div className="container flex flex-wrap justify-center text-white gap-2 p-4">
			<Link href={'/items'}>Go to items list</Link>
		</div>
	)
}
