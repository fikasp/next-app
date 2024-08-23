/**
 * Provides a theme provider component for the application.
 *
 * @component
 * @param {ThemeProviderProps} props - The props for the ThemeProvider component.
 * @returns {JSX.Element} The rendered ThemeProvider component.
 */
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
