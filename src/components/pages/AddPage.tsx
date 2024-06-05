// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ProjectForm from '@/components/forms/ProjectForm'

export default function AddPage() {
	return (
		<ArwContainer center>
			<ArwPaper
				square
				className="w-full-4 max-w-md border dark:border-none p-8"
			>
				<ProjectForm />
			</ArwPaper>
		</ArwContainer>
	)
}
