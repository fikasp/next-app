import type { Metadata } from 'next'
import { Poppins, Roboto } from 'next/font/google'
import { Inter } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
	title: 'ARW Next App Template',
	description: 'Item list Next App',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>{children}</body>
		</html>
	)
}
