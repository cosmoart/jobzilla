import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Jobzilla',
	description: 'Jobzilla is a job search engine that allows you to search for jobs in your area.',
	openGraph: {
		type: 'website',
		title: 'Jobzilla',
		description: 'Jobzilla is a job search engine that allows you to search for jobs in your area.',
		url: 'https://jobzilla.vercel.app',
		siteName: 'Jobzilla'
	},
	robots: {
		index: true,
		follow: true
	},
	icons: {
		shortcut: '/favicon.svg'
	}
}

export default function RootLayout ({ children }) {
	return (
		<html lang='en'>
			<head>
				<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.min.css' />
			</head>
			<body className={inter.className}>
				<NavBar />
				{children}
			</body>
		</html>
	)
}
