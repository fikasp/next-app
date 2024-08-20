// components
import MenuItem from '@/components/layout/menu/MenuItem'
import MenuSorting from '@/components/layout/menu/MenuSorting'
import MenuTheme from '@/components/layout/menu/MenuTheme'
// lib
import { navigation } from '@/navigation'
import { cn } from '@/lib/utils'

export default function Menu({
	setOpen,
	className,
}: {
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	className?: string
}) {
	return (
		<nav className={cn('flex-center', className)}>
			<ul className="flex max-md:flex-col gap-6 md:gap-4">
				{navigation.map((link) => {
					return (
						<MenuItem
							key={link.route}
							publicRoute={link.public}
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
