'use client'
// modules
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
// components
import { ArwButton } from '@/components/arw'
// lib
import { Icons } from '@/lib/types/enums'
import { cn } from '@/lib/utils'

export default function SortableItem({
	id,
	className,
	children,
	center,
}: {
	id: string
	className?: string
	children: React.ReactNode
	center?: boolean
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
	} = useSortable({
		id,
	})
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}
	return (
		<div ref={setNodeRef} className="relative" style={style} {...attributes}>
			{children}
			<div
				className={cn(
					'absolute z-20 p-3',
					center && 'top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
					className
				)}
				ref={setActivatorNodeRef}
				{...listeners}
			>
				<ArwButton icon={Icons.Grip} size={30} />
			</div>
		</div>
	)
}
