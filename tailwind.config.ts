import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

const BASE = 'slate'
const ACCENT = 'blue'

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				accent: {
					...colors[ACCENT],
					DEFAULT: colors[ACCENT][500],
				},
				base: {
					...colors[BASE],
					DEFAULT: colors[BASE][500],
				},
				blue: {
					DEFAULT: colors.blue[500],
				},
				gray: {
					DEFAULT: colors.gray[500],
				},
				orange: {
					DEFAULT: colors.orange[500],
				},
				red: {
					DEFAULT: colors.red[500],
				},
			},
			fontFamily: {
				sans: ['Verdana', 'sans-serif'],
				serif: ['Times New Roman', 'serif'],
				poppins: ['var(--font-poppins)'],
				roboto: ['var(--font-roboto)'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			screens: {
				'xs': '400px',
			},
			width: {
				'full-1': 'calc(100% - 8px)',
				'full-2': 'calc(100% - 16px)',
				'full-3': 'calc(100% - 24px)',
				'full-4': 'calc(100% - 32px)',
			},
			maxHeight: {
				'screen-4': 'calc(100vh - 32px)',
			},
			maxWidth: {
				'screen-4': 'calc(100vw - 32px)',
			},
			minHeight: {
				md: '28rem',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		plugin(({ addUtilities }) => {
			addUtilities({
				'.flex-center': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
				'.flex-between': {
					display: 'flex',
					justifyContent: 'between',
					alignItems: 'center',
				},
			})
		}),
	],
} satisfies Config

export default config
