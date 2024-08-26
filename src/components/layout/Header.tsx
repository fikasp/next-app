// modules
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
// components
import { ArwLink } from '@/components/arw'
import Menu from '@/components/layout/Menu'
// lib
import { checkIfCurrentUserIsAdmin } from '@/lib/utils'

export default async function Header() {
	const isAdmin = await checkIfCurrentUserIsAdmin()

	return (
		<header className="sticky z-50 top-0 backdrop-blur-md bg-base-200/50 dark:bg-base-950/50 shadow-md p-4 h-[75px] flex-center">
			<div className="container flex justify-between p-0 xl:px-4">
				{/* left */}
				<div className="flex items-center z-50">
					<h1 className="text-2xl font-bold">
						<ArwLink href={`/`}>ARW</ArwLink>
					</h1>
				</div>

				{/* center */}
				<Menu isAdmin={isAdmin} />

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
