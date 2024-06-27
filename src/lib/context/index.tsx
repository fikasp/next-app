'use client'
import { createContext, useState, useContext } from 'react'

const initialContext = {}

const AppContext = createContext(initialContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState(initialContext)

	return (
		<AppContext.Provider value={{ state, setState }}>
			{children}
		</AppContext.Provider>
	)
}

export function useAppContext() {
	return useContext(AppContext)
}
