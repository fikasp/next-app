export default function Arw({
	children,
	className,
	onClick,
}: {
	children: React.ReactNode
	className?: string
	onClick?: () => void
}) {
	return (
		<div className={className} onClick={onClick}>
			{children}
		</div>
	)
}
