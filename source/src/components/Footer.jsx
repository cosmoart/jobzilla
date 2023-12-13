import Image from 'next/image'
import Link from 'next/link'
import githubLogo from '@/assets/icons/github.svg'

export default function Footer () {
	const links = [
		{
			name: 'Inicio',
			href: '/'
		},
		{
			name: 'Buscar empleo',
			href: '/buscador-empleos'
		},
		{
			name: 'Buscar empresas',
			href: '/buscador-empresas'
		}
	]

	return (

		<footer className='w-full bg-gray-100 dark:bg-gray-900 py-14'>
			<div className='md:px-12 lg:px-28'>
				<div className='container m-auto space-y-6 text-gray-600 dark:text-gray-300'>
					<Image src='/favicon.svg' alt='logo tailus' className='m-auto w-12 invert' width={48} height={48} />
					<ul
						role='list'
						className='flex flex-col items-center justify-center gap-4 py-4 !mt-3 sm:flex-row sm:gap-8'
					>
						{
							links.map((link, index) => (
								<li role='listitem' key={index}>
									<Link href={link.href} className='hover:text-slate-700 dark:hover:text-slate-200  hover:translate-x-1 transition-all '>
										{link.name}
									</Link>
								</li>
							))
						}
					</ul>

					<p className='text-center !mt-0'>Información gracias a <strong><a className='underline hover:opacity-90 transition-colors' href='https://www.infojobs.net' target='_blank' rel='noopener noreferrer'>Infojobs</a></strong></p>
					<div className='text-center !mt-3'>
						<p className=' text-sm tracking-wide'>
							Creado por <a className='underline hover:text-slate-900' target='_blank' rel='noopener noreferrer' href='https://github.com/cosmoart'>Cosmo</a> - <a className='hover:text-slate-900 underline align-middle' href='https://github.com/cosmoart/jobzilla' target='_blank' rel='noopener noreferrer' title='La información que se muestra se ha obtenido a través de la API de Infojobs y está sujeta a los términos y condiciones de Infojobs.'>
								<Image src={githubLogo} alt='Github Logo' width={20} height={20} className='inline-block mr-1 ml-2 dark:invert opacity-90' />
								Licencia MIT
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	)

	// return (
	// 	<footer className='py-5 px-6 bg-white dark:bg-slate-800'>
	// 		<div className='mx-auto max-w-7xl w-full flex flex-col sm:flex-row justify-between items-center gap-8 text-center md:text-left'>
	// 			<Link href='/' className='sm:self-start invert dark:invert-0'>
	// 				<Image src='/favicon.svg' alt='JobZilla Logo' width={50} height={50} />
	// 			</Link>
	// 			<nav className='flex flex-col flex-grow items-start'>
	// 				{
	// 					links.map((link, index) => (
	// 						<Link href={link.href} key={index} className='hover:text-slate-700 dark:hover:text-slate-200  hover:translate-x-1 transition-all'>
	// 							{link.name}
	// 						</Link>
	// 					))
	// 				}
	// 			</nav>
	// 			<div className='text-sm'>
	// 				<a className='underline align-middle' href='https://github.com/cosmoart/jobzilla' target='_blank' rel='noopener noreferrer' title='La información que se muestra se ha obtenido a través de la API de Infojobs y está sujeta a los términos y condiciones de Infojobs.'>
	// 					<Image src={githubLogo} alt='Github Logo' width={20} height={20} className='inline-block mr-1 dark:invert' />
	// 					Licencia MIT
	// 				</a>
	// 				<p className='mt-1'>
	// 					Creado con ❤️ por <a className='underline hover:text-primary-slate-20' target='_blank' rel='noopener noreferrer' href='https://github.com/cosmoart'>Cosmo</a>
	// 				</p>
	// 			</div>
	// 		</div>
	// 	</footer>
	// )
}
