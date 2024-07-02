'use client'
import { ArwContainer, ArwText, ArwTitle } from '@/components/arw'

export default function Error({ error }: { error: Error }) {
	return (
		<ArwContainer center className="gap-6 p-6">
			<ArwTitle center>Oops! Something went wrong...</ArwTitle>
			<ArwText center>
				It seems that we&apos;ve encountered an unexpected issue while using the
				application.
			</ArwText>
			<ArwText center>
				We apologize for any inconvenience this may have caused.
			</ArwText>
			<ArwText center accent>
				{error.message}
			</ArwText>
		</ArwContainer>
	)
}
