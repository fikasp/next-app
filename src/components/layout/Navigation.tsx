// modules
import { useAuth } from '@clerk/nextjs'
// components
import NavItem from '@/components/layout/nav/NavItem'
import NavSorting from '@/components/layout/nav/NavSorting'
import NavTheme from '@/components/layout/nav/NavTheme'
// lib
import { navigation } from '@/navigation'
import { cn } from '@/lib/utils'

export default function Navigation({
	setOpen,
	className,
	isAdmin,
}: {
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	className?: string
	isAdmin: boolean
}) {
	const { isSignedIn } = useAuth()

	return (
		<nav className={cn('flex-center', className)}>
			<ul className="flex max-md:flex-col gap-6 md:gap-4">
				{navigation.map((item) => {
					return (
						<NavItem
							key={item.route}
							item={item}
							admin={isAdmin}
							profile={isSignedIn}
							setOpen={setOpen}
						/>
					)
				})}
				<li>
					<NavSorting />
				</li>
				<li>
					<NavTheme />
				</li>
			</ul>
		</nav>
	)
}
