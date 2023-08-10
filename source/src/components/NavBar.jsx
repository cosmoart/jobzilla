'use client'

import Link from 'next/link'
import Image from 'next/image'
import DarkBtn from './DarkBtn'
import menuIcon from '@/assets/icons/menu.svg'
import closeIcon from '@/assets/icons/close.svg'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import useScreen from '@/hooks/useScreen'

export default function NavBar () {
	const screenWidth = useScreen()
	const [showMenu, setShowMenu] = useState(false)

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
		} else navbar.classList.add('darkHeader')
	}, [pathname])

	return (
		<header className='group darkHeader shadow backdrop-blur sticky top-0 w-full z-40'>
			<nav className='mx-auto max-w-6xl'>
				<div className='flex relative gap-5 py-4 px-4 xl:px-0 justify-center items-center font-normal'>
					<Link href='/'>
						<Image className='group-[&.darkHeader]:invert' src='/favicon.svg' alt='Jobzilla logo' width={30} height={30} />
					</Link>
					<div className={`flex-grow flex justify-end ${screenWidth < 924 ? '' : 'hidden'}`}>
						<button className='group-[&.darkHeader]:text-slate-900 text-white hover:text-blue-600'>
							<Image src={menuIcon} className='group-[&.darkHeader]:invert' alt='Menu icon' width={30} height={30} onClick={() => setShowMenu(!showMenu)} />
						</button>
					</div>
					<div className={`flex shadow md:shadow-none items-center gap-5 rounded-md flex-grow top-0 ${screenWidth < 924 ? 'flex-col absolute transition-all items-end px-5 py-2 right-0 bg-white' : ''} ${screenWidth < 924 && (showMenu ? 'top-14	opacity-100' : 'opacity-0 pointer-events-none -z-10')}`}>
						<Link href='/buscador-empleos' className='hover:text-blue-600 text-white group-[&.darkHeader]:text-slate-900'>Empleos</Link>
						<Link href='/buscador-empresas' className='hover:text-blue-600 text-white group-[&.darkHeader]:text-slate-900'>Empresas</Link>
						<div className='flex gap-2 md:gap-4 ml-auto' >
							<div className='flex-grow flex justify-end'>
								<DarkBtn />
							</div>
							<div>
								<a href={AuthURL} target='_blank' rel='noopener noreferrer' className='bg-blue-500 w-8 aspect-square block rounded-full'></a>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header >
	)
}
