'use client'
// modules
import Link from 'next/link'
import { useState } from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
// components
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Icon from '@/components/shared/common/ArwIcon'
import Menu from '@/components/layout/Menu'

export default function Header() {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	return (
		<header className="sticky top-0 arw-backdrop-light dark:arw-backdrop-dark shadow-md p-4 h-[72px] flex-center">
			<div className="container flex-between p-0 xl:px-4">
				{/* left */}
				<div className="flex-start">
					<h1 className="text-2xl font-bold">
						<Link href={`/`} className="arw-text-hover">
							ARW
						</Link>
					</h1>
				</div>

				{/* center */}
				<div className="arw-absolute-center flex-center">
					<SignedIn>
						<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} modal={false}>
							<SheetTrigger>
								<Icon src="/assets/icons/menu.svg" className="arw-text-hover" />
							</SheetTrigger>
							<SheetContent
								side="top"
								className="arw-backdrop-light dark:arw-backdrop-dark border-none flex-center"
							>
								<Menu setOpen={setIsSheetOpen} />
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
						<Link href={`/sign-in`} className="arw-text-hover px-2">
							Login
						</Link>
					</SignedOut>
				</div>
			</div>
		</header>
	)
}
