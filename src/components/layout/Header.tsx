import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export default function Header() {
	return (
		<header className="sticky top-0 flex-center w-full backdrop-blur-md bg-black/50 shadow-xl text-white p-4">
			<div className="container flex-between">
				<div className="flex w-[100px]>
					<h1 className="text-2xl font-bold">
						<Link href={`/`}>ARW</Link>
					</h1>
				</div>
				<div>
					<h1 className="font-bold">Menu</h1>
				</div>
				<div className="flex-end w-[100px]">
					<h1>
						<UserButton afterSignOutUrl="/" />
					</h1>
				</div>
			</div>
		</header>
	)
}
