export default function Layout({ children }: LayoutProps) {
	return (
		<main className="flex-center min-h-screen w-full bg-gray-900">
			{children}
		</main>
	)
}
