'use client'

import LightIcon from '../assets/icons/light.svg'
import DarkIcon from '../assets/icons/dark.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function DarkBtn () {
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		const localDarkMode = localStorage.getItem('darkMode')
		setDarkMode(localDarkMode ? localDarkMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches)
	}, [])

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode)
		localStorage.setItem('darkMode', darkMode)
	}, [darkMode])

	return (
		<button onClick={() => setDarkMode(!darkMode)} className=''>
			{darkMode
				? <Image src={LightIcon} alt='Light Mode' width={20} height={20} className='invert' />
				: <Image src={DarkIcon} alt='Dark Mode' width={20} height={20} className='invert group-[&.darkHeader]:invert-0' />
			}
		</button>
	)
}
