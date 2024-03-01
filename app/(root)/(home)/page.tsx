import Link from 'next/link'

export default function Home() {
	const table = Array.from(Array(20).keys()).map((x) => x + 1)
	return (
		<div className="container flex flex-wrap justify-center bg-gray-800 text-white gap-2 p-4">
			{table.map( item => (
				<Link href={`/task/${item}`} key={item}>
					<div className="h-[300px] w-[300px] bg-blue-900 flex-center">{item}</div>
				</Link>
			))}
		</div>
	)
}
