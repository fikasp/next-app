import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex-between flex-col text-white">
			<Header />
			<Main>{children}</Main>
			<Footer />
		</div>
	) 
}
