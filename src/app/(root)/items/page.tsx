import Link from 'next/link'

export default function Home() {
	const table = Array.from(Array(20).keys()).map((x) => x + 1)
	return (
		<div className="container grid grid-auto-300 gap-2 p-4">
			{table.map((item) => (
				<Link href={`/items/${item}`} key={item}>
					<div className="justify-self-center h-[300px] bg-blue-900 flex-center">
						{item}
					</div>
				</Link>
			))}
		</div>
	)
}
