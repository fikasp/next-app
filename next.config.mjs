/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
			},
		],
	},
}

export default nextConfig
