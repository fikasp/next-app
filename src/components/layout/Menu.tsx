// modules
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
// components
import MenuItem from '@/components/layout/menu/MenuItem'
import MenuSorting from '@/components/layout/menu/MenuSorting'
import MenuTheme from '@/components/layout/menu/MenuTheme'
// lib
import { navigation } from '@/navigation'
import { checkIfCurrentUserIsAdmin, cn } from '@/lib/utils'

export default function Menu({
	setOpen,
	className,
}: {
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	className?: string
}) {
	const { isSignedIn } = useAuth()
	const [isAdmin, setIsAdmin] = useState(false)
	useEffect(() => {
		const fetchAdminStatus = async () => {
			const adminStatus = await checkIfCurrentUserIsAdmin()
			setIsAdmin(adminStatus)
		}

		fetchAdminStatus()
	}, [])

	return (
		<nav className={cn('flex-center', className)}>
			<ul className="flex max-md:flex-col gap-6 md:gap-4">
				{navigation.map((link) => {
					return (
						<MenuItem
							key={link.route}
							admin={isAdmin}
							adminRoute={link.admin}
							profileRoute={link.profile}
							profile={isSignedIn}
							setOpen={setOpen}
							link={link}
						/>
					)
				})}
				<li>
					<MenuSorting />
				</li>
				<li>
					<MenuTheme />
				</li>
			</ul>
		</nav>
	)
}
