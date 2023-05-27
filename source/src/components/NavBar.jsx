'use client'

import Link from 'next/link'
import DarkBtn from './DarkBtn'
import Image from 'next/image'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function NavBar () {
	const AuthURL = `https://www.infojobs.net/api/oauth/user-authorize/index.xhtml
	?scope=MY_APPLICATIONS
	&client_id=${process.env.NEXT_PUBLIC_INFOJOBS_CLIENT_ID}
	&redirect_uri=https://jobzilla.vercel.app
	&response_type=code`
	const pathname = usePathname()

	useEffect(() => {
		const navbar = document.querySelector('header')
		if (pathname === '/') {
			navbar.classList.remove('darkHeader')
			function handleScroll () {
				const scrollY = window.scrollY
				navbar.classList.toggle('darkHeader', scrollY > 500)
			}

			window.addEventListener('scroll', handleScroll)
			return () => window.removeEventListener('scroll', handleScroll)
		} else {
			navbar.classList.add('darkHeader')
		}
	}, [pathname])

	return (
		<header className='group darkHeader shadow sticky top-0 z-40 backdrop-blur '>
			<nav className='mx-auto max-w-6xl'>
				<ul className='flex gap-5 py-4 px-4 lg:px-0 justify-center items-center font-normal'>
					<li>
						<Link href='/'>
							<Image className='group-[&.darkHeader]:invert' src='/favicon.svg' alt='Jobzilla logo' width={30} height={30} />
						</Link>
					</li>
					<li>
						<Link href='/buscador-empleos' className='hover:text-blue-600 text-white group-[&.darkHeader]:text-slate-900'>Empleos</Link>
					</li>
					<li>
						<Link href='/buscador-empresas' className='hover:text-blue-600 text-white group-[&.darkHeader]:text-slate-900'>Empresas</Link>
					</li>
					<li>
						<Link href='/informacion' className='hover:text-blue-600 text-white group-[&.darkHeader]:text-slate-900'>Información</Link>
					</li>
					<li className='flex-grow flex justify-end'>
						<DarkBtn />
					</li>
					<li>
						<a href={AuthURL} target='_blank' rel='noopener noreferrer' className='bg-blue-500 w-8 aspect-square block rounded-full'></a>
					</li>
				</ul>
			</nav>
		</header>
	)
}
