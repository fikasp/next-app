import withPWA from 'next-pwa'

const isProd = process.env.NODE_ENV === 'production'

const withPWAConfig = withPWA({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: !isProd,
})

/** @type {import('next').NextConfig} */
const nextConfig = withPWAConfig({
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
			},
		],
	},
})

export default nextConfig
