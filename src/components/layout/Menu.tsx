// components
import MenuItem from '@/components/layout/menu/MenuItem'
import MenuTheme from '@/components/layout/menu/MenuTheme'
// lib
import { navigation } from '@/navigation'
import MenuSorting from './menu/MenuSorting'

export default function Menu({
	setOpen,
}: {
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<nav className="flex-center">
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
