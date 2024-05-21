// components
import ArwContainer from '@/components/shared/containers/ArwContainer'

export default function ItemUpdatePage({ id }: { id: string }) {
	return (
		<ArwContainer className="flex-center">Update item no. {id}</ArwContainer>
	)
}
