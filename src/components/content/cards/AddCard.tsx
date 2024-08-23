// modules
import Link from 'next/link'
// components
import { ArwIcon, ArwPaper } from '@/components/arw'
// lib
import { routes } from '@/lib/constants/paths'
import { Icons } from '@/lib/types/enums'

export default function AddCard() {
	return (
		<Link href={routes.ADD}>
			<ArwPaper
				square
				center
				className="max-lg:aspect-video hover:text-accent transition"
			>
				<ArwIcon icon={Icons.SquarePlus} size={50} />
			</ArwPaper>
		</Link>
	)
}
