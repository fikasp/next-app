// modules
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
// components
import { ArwIcon, ArwLink, ArwTitle } from '@/components/arw'
import Menu from '@/components/layout/Menu'
// lib
import { checkIsAdmin } from '@/lib/utils'
import { icons, routes } from '@/lib/constants/paths'

export default function Header() {
	const isAdmin = checkIsAdmin()

	return (
		<header className="sticky z-50 top-0 backdrop-blur-md bg-base-200/50 dark:bg-base-950/50 shadow-md p-4 h-[75px] flex-center">
			<div className="container flex justify-between items-center p-0 xl:px-4">
				{/* left */}
				<ArwLink href={`/`} className="flex-center z-50">
					<ArwIcon src={icons.ARW} size={40} />
					<ArwTitle className="text-2xl max-lg:hidden">ARW</ArwTitle>
				</ArwLink>

				{/* center */}
				<Menu isAdmin={isAdmin} />

				{/* right */}
				<SignedIn>
					<UserButton afterSignOutUrl={routes.HOME} />
				</SignedIn>
				<SignedOut>
					<ArwLink href={routes.SIGNIN} className="px-2 z-50">
						Login
					</ArwLink>
				</SignedOut>
			</div>
		</header>
	)
}
