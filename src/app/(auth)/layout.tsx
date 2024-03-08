export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex-center min-h-screen w-full bg-gray-900">
			{children}
		</main>
	)
}
