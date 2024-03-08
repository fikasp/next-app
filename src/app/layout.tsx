import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Poppins, Roboto } from 'next/font/google'
import { cn } from '@/lib/utils/'
import './globals.css'

// fonts
const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700', '900'],
	variable: '--font-poppins',
})

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700', '900'],
	variable: '--font-roboto',
})

// metadata
export const metadata: Metadata = {
	title: 'ARW Next App Template',
	description: 'Items list with CRUD',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider
			appearance={{
				variables: { colorPrimary: '#468' },
			}}
		>
			<html lang="en">
				<body
					className={cn(
						'font-poppins antialiased bg-gray-900 text-white',
						poppins.variable,
						roboto.variable
					)}
				>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
