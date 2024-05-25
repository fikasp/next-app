'use client'
import ArwContainer from '@/components/arw/ArwContainer'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'

export default function Error() {
	return (
		<ArwContainer center className="gap-6">
			<ArwTitle>Oops! Something went wrong...</ArwTitle>
			<ArwText center>
				It seems that we&apos;ve encountered an unexpected issue while using the application. 
			</ArwText>
      <ArwText center>
				We apologize for any inconvenience this may have caused.
			</ArwText>
		</ArwContainer>
	)
}
