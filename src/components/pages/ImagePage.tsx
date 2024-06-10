// modules
import Image from 'next/image'
// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import Navigation from '@/components/shared/Navigation'
// lib
import { Adjacent } from '@/lib/types'
import { generateUrl } from '@/lib/utils'
import { IImage } from '@/lib/models/image.model'
import { routes } from '@/navigation'

export default async function ImagePage({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	// Get the image ID and project slug
	const slug = params.slug
	const id = params.id

	// Get the current and adjacent images
	const { prev, current, next }: Adjacent<IImage> = await getImageById(id, slug)

	// Generate URLs
	const prevUrl =
		prev && generateUrl([routes.PROJECTS, slug, prev._id], searchParams)
	const nextUrl =
		next && generateUrl([routes.PROJECTS, slug, next._id], searchParams)
	const backUrl = generateUrl([routes.PROJECTS, slug], searchParams)

	return (
		<div className="fixed flex-center md:p-4 h-screen w-screen top-0 left-0 z-50 backdrop-blur-md">
			<div
				className="relative inline-block md:rounded-md overflow-hidden"
			>
				<Image
					src={current!.url}
					width={1400}
					height={1400}
					loading={"lazy"}
					alt="Image"
					className="w-auto h-auto max-h-screen md:max-h-screen-4 object-contain"
				/>
				<Navigation
					className="absolute top-4 right-4"
					back={backUrl}
					prev={prevUrl}
					next={nextUrl}
				/>
			</div>
		</div>
	)
}


<Image
src={images[selectedIndex]?.url}
alt={images[selectedIndex]?.name}
width={600}
height={400}
className="w-full h-full object-contain"
/>

<ArwButton
src={icons.BACK}
onClick={handlePrevClick}
className="text-white"
/>
<ArwButton
src={icons.NEXT}
onClick={handleNextClick}
className="text-white"
/>