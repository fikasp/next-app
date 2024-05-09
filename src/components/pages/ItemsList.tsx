// modules
import Link from 'next/link'
// components
import ArwContainer from '@/components/shared/containers/ArwContainer'

export default function ItemsList() {
	const table = Array.from(Array(12).keys()).map((x) => x + 1)
	return (
		<ArwContainer className="grid grid-auto-300 gap-2 p-4">
			{table.map((item) => (
				<Link href={`/items/${item}`} key={item}>
					<div className="justify-self-center h-[300px] bg-blue-900 flex-center">
						{item}
					</div>
				</Link>
			))}
		</ArwContainer>
	)
}
