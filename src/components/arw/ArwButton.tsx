// components
import ArwIcon from './ArwIcon'

export default function ArwButton({
	onClick,
	label,
	src,
}: {
	onClick: () => void
	label?: string
	src?: string
}) {
	return (
		<button
			onClick={onClick}
			aria-label={label}
			className="flex-center gap-2 hover:text-accent transition"
		>
			{src && <ArwIcon src={src} />}
			{label}
		</button>
	)
}
