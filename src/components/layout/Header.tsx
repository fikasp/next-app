'use client'

import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet'
import { ReactSVG } from 'react-svg'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Menu from './Menu'

export default function Header() {
	return (
		<header className="sticky top-0 flex-center w-full backdrop-blur-md bg-black/50 shadow-xl text-white p-4">
			<div className="container flex-between p-0">
				{/* left */}
				<div className="flex-start w-[100px]">
					<h1 className="text-2xl font-bold">
						<Link href={`/`}>ARW</Link>
					</h1>
				</div>

				{/* center */}
				<div className="flex-center">
					<Sheet>
						<SheetTrigger>
							<ReactSVG src="/assets/icons/menu.svg" />
						</SheetTrigger>
						<SheetContent
							side="top"
							className="bg-black/50 backdrop-blur-md border-none p-5"
						>
							<Menu />
						</SheetContent>
					</Sheet>
				</div>

				{/* right */}
				<div className="flex-end w-[100px]">
					<h1>
						<UserButton afterSignOutUrl="/" />
					</h1>
				</div>
			</div>
		</header>
	)
}
