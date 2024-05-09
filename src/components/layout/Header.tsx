'use client'
// modules
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
// components
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Icon from '@/components/shared/common/ArwIcon'
import Menu from '@/components/layout/Menu'

export default function Header() {
	return (
		<header className="sticky top-0 backdrop-black shadow-xl text-white p-4">
			<div className="container flex-between p-0 xl:px-4">
				{/* left */}
				<div className="flex-start">
					<h1 className="text-2xl font-bold">
						<Link href={`/`} className="hover-blue">
							ARW
						</Link>
					</h1>
				</div>

				{/* center */}
				<div className="absolute-center flex-center">
					<SignedIn>
						<Sheet>
							<SheetTrigger>
								<Icon src="/assets/icons/menu.svg" className="hover-blue" />
							</SheetTrigger>
							<SheetContent
								side="top"
								className="backdrop-black border-none p-5 flex-center"
							>
								<Menu />
							</SheetContent>
						</Sheet>
					</SignedIn>
				</div>

				{/* right */}
				<div className="flex-end">
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
					<SignedOut>
						<Link href={`/sign-in`} className="hover-blue px-2">
							Login
						</Link>
					</SignedOut>
				</div>
			</div>
		</header>
	)
}
