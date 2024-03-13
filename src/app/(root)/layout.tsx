import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Main from '@/components/layout/Main'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Header />
			<Main>{children}</Main>
			<Footer />
		</div>
	)
}
