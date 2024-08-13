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
			<ul className="flex max-md:flex-col md:items-center gap-6 md:gap-4">
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
				<li className="flex">
					<MenuSorting setOpen={setOpen} />
				</li>
				<li className="flex">
					<MenuTheme setOpen={setOpen} />
				</li>
			</ul>
		</nav>
	)
}
