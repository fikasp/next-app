/** @type {import('next').NextConfig} */
const nextConfig = {
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
