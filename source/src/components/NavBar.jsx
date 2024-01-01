'use client'

import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'
import menuIcon from '@/assets/icons/menu.svg'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import useScreen from '@/hooks/useScreen'

export default function NavBar () {
	const screenWidth = useScreen()
	const [showMenu, setShowMenu] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const navbar = document.querySelector('header')
		function handleScroll () {
			if (window.scrollY > window.innerHeight - 200) navbar.classList.add('homeScrolled')
			else navbar.classList.remove('homeScrolled')
		}

		if (pathname === '/') window.addEventListener('scroll', handleScroll)
		return () => {
			if (pathname === '/') window.removeEventListener('scroll', handleScroll)
		}
	}, [pathname])

	useEffect(() => {
		const navbar = document.querySelector('header')
		if (pathname === '/') {
			navbar.classList.remove('darkHeader')
		} else navbar.classList.add('darkHeader')
	}, [pathname])

	return (
		<header className='group darkHeader shadow backdrop-blur sticky top-0 w-full z-40 '>
			<nav className='mx-auto max-w-7xl'>
				<div className='flex relative gap-5 py-4 px-6 2xl:px-0 justify-center items-center font-normal'>
					<Link href='/' className='pr-4'>
						<Image className='group-[&.darkHeader]:invert navBarImg dark:!invert-0' src='/favicon.svg' alt='Jobzilla logo' width={30} height={30} />
					</Link>
					<div className={`flex-grow flex justify-end ${screenWidth < 924 ? '' : 'hidden'}`}>
						<button className='group-[&.darkHeader]:text-gray-900 text-white hover:text-blue-600'>
							<Image src={menuIcon} className='group-[&.darkHeader]:invert' alt='Menu icon' width={30} height={30} onClick={() => setShowMenu(!showMenu)} />
						</button>
					</div>
					<div className={`flex shadow md:shadow-none items-center gap-5 rounded-md flex-grow top-0 ${screenWidth < 924 ? 'flex-col absolute transition-all items-end px-5 py-2 right-0 dark:bg-gray-700 bg-white ' : ''} ${screenWidth < 924 && (showMenu ? 'top-14	opacity-100' : 'opacity-0 pointer-events-none -z-10')}`}>
						<Link href='/buscador-empleos' className='hover:text-blue-600 text-white group-[&.darkHeader]:text-gray-900 dark:!text-white'>Buscar empleos</Link>
						<Link href='/buscador-empresas' className='hover:text-blue-600 text-white group-[&.darkHeader]:text-gray-900 dark:!text-white'>Buscar empresas</Link>
						<div className='flex gap-2 md:gap-4 ml-auto' >
							<div className='flex-grow flex justify-end'>
								<ThemeToggle />
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header >
	)
}
