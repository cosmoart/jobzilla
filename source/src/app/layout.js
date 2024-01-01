import { ThemeProvider } from '@/provider/theme-provider'
import NavBar from '@/components/NavBar'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import './globals.css'
import './index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	metadataBase: new URL('https://acme.com'),
	title: 'Jobzilla',
	description: 'Jobzilla is a job search engine that allows you to search for jobs in your area.',
	openGraph: {
		type: 'website',
		title: 'Jobzilla',
		description: 'Jobzilla is a job search engine that allows you to search for jobs in your area.',
		url: 'https://jobzilla.vercel.app',
		siteName: 'Jobzilla',
		images: ['https://repository-images.githubusercontent.com/641688317/28863c5e-ff9e-4d3a-aca4-3949a4292fdc']
	},
	twitter: {
		twitter: {
			card: 'summary_large_image',
			title: 'Jobzilla',
			description: 'Jobzilla is a job search engine that allows you to search for jobs in your area.',
			creator: '@cosmoart0',
			images: ['https://repository-images.githubusercontent.com/641688317/28863c5e-ff9e-4d3a-aca4-3949a4292fdc']
		}
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
		<html lang='es'>
			<head>
				<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.min.css' />
				<link rel='stylesheet' href='https://unpkg.com/leaflet/dist/leaflet.css' />
				<link rel='stylesheet' href='https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css' />
			</head>
			<body className={`${inter.className} dark:bg-gray-700 text-gray-950 dark:text-white min-h-screen flex flex-col`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<NavBar />
					<div className='flex-grow'>
						{children}
					</div>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
