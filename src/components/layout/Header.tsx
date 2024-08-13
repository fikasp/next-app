'use client'
// modules
import Link from 'next/link'
import { Else, If, Then, When } from 'react-if'
import { useEffect, useState } from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
// components
import { ArwLink, ArwIcon } from '@/components/arw'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Menu from '@/components/layout/Menu'
// lib
import { useMobile } from '@/lib/utils/hooks'
import { Icons } from '@/lib/types/enums'

export default function Header() {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const [isClient, setIsClient] = useState(false)
	const isMobile = useMobile()

	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<header className="sticky z-50 top-0 backdrop-blur-md bg-base-200/50 dark:bg-base-950/50  shadow-md p-4 h-[75px] flex-center">
			<div className="container flex justify-between p-0 xl:px-4">
				{/* left */}
				<div className="flex items-center z-50">
					<h1 className="text-2xl font-bold">
						<ArwLink href={`/`}>ARW</ArwLink>
					</h1>
				</div>

				{/* center */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-center w-full">
					<When condition={isClient}>
						<If condition={isMobile}>
							<Then>
								<Sheet
									open={isSheetOpen}
									onOpenChange={setIsSheetOpen}
									modal={isMobile}
								>
									<SheetTrigger>
										<ArwIcon
											icon={Icons.Menu}
											className="hover:text-accent transtion"
											size={30}
										/>
									</SheetTrigger>
									<SheetContent
										side="top"
										className="backdrop-blur-md bg-base-200/50 dark:bg-base-950/50 border-none flex-center min-h-[75px]"
									>
										<Menu setOpen={setIsSheetOpen} />
									</SheetContent>
								</Sheet>
							</Then>
							<Else>
								<Menu />
							</Else>
						</If>
					</When>
				</div>

				{/* right */}
				<div className="flex items-center z-50">
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
					<SignedOut>
						<Link
							href={`/sign-in`}
							className="hover:text-accent transition px-2"
						>
							Login
						</Link>
					</SignedOut>
				</div>
			</div>
		</header>
	)
}
