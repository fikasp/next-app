// components
import ArwPaper from '@/components/arw/ArwPaper'
import ArwContainer from '@/components/arw/ArwContainer'

export default function SettingsPage() {
	return (
		<ArwContainer center>
			<ArwPaper
				square
				className="w-full-4 max-w-md border dark:border-none p-8"
        center
			>
				Settings
			</ArwPaper>
		</ArwContainer>
	)
}
