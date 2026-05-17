/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'picsum.photos' },
			{ protocol: 'https', hostname: 'multimedia.infojobs.net' },
			{ protocol: 'https', hostname: 'www.spain.info' },
			{ protocol: 'https', hostname: 'hips.hearstapps.com' },
			{ protocol: 'https', hostname: 'a1.eestatic.com' }
		]
	}
}

module.exports = nextConfig
