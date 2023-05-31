import { useEffect, useState } from 'react'

export default function useScreen () {
	const [screenWidth, setScreenWidth] = useState(1200)

	useEffect(() => {
		setScreenWidth(window.innerWidth)
		window.addEventListener('resize', () => setScreenWidth(window.innerWidth))
		return () => window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
	}, [])

	return screenWidth
}
