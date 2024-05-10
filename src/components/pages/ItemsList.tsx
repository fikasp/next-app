// modules
import Link from 'next/link'
// components
import ArwContainer from '@/components/shared/containers/ArwContainer'

const Item = ({ item }: { item: number }) => {
	return (
		<div className="justify-self-center h-[300px] bg-blue-900 flex-between flex-col p-4">
			<h1 className="font-bold">{`Item no. ${item}`}</h1>
			<p>Description</p>
		</div>
	)
}

export default function ItemsList() {
	const table = Array.from(Array(12).keys()).map((x) => x + 1)
	return (
		<ArwContainer className="grid grid-auto-300 gap-2 p-4">
			{table.map((item) => (
				<Link href={`/items/${item}`} key={item}>
					<Item item={item} />
				</Link>
			))}
		</ArwContainer>
	)
}
