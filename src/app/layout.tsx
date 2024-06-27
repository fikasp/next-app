// modules
import React from 'react'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Poppins, Roboto } from 'next/font/google'
// components
import { ThemeProvider } from '@/components/layout/Provider'
import { Toaster } from '@/components/ui/toaster'
// lib
import { cn } from '@/lib/utils/'
import { AppProvider } from '@/lib/context'
import '@/lib/styles/globals.css'

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
	description: 'Projects CRUD',
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
						'font-poppins antialiased bg-white dark:bg-base-900 text-black dark:text-white',
						poppins.variable,
						roboto.variable
					)}
				>
					<AppProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							disableTransitionOnChange
							enableSystem
						>
							{children}
							<Toaster />
						</ThemeProvider>
					</AppProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
