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
		},
		{
			name: 'Información',
			href: '/informacion'
		}
	]

	return (
		<footer className='py-5 px-6 bg-white dark:bg-slate-800'>
			<div className='mx-auto max-w-6xl w-full flex flex-col sm:flex-row justify-between items-center gap-8 text-center md:text-left'>
				<Link href='/' className='sm:self-start invert dark:invert-0'>
					<Image src='/favicon.svg' alt='JobZilla Logo' width={50} height={50} />
				</Link>
				<nav className='flex flex-col flex-grow items-start'>
					{
						links.map((link, index) => (
							<Link href={link.href} key={index} className='hover:text-slate-700 dark:hover:text-slate-200  hover:translate-x-1 transition-all'>
								{link.name}
							</Link>
						))
					}
				</nav>
				<div className='text-sm'>
					<a className='underline align-middle' href='https://github.com/cosmoart/jobzilla' target='_blank' rel='noopener noreferrer' title='La información que se muestra se ha obtenido a través de la API de Infojobs y está sujeta a los términos y condiciones de Infojobs.'>
						<Image src={githubLogo} alt='Github Logo' width={20} height={20} className='inline-block mr-1 dark:invert' />
						Licencia MIT
					</a>
					<p className='mt-1'>
						Creado con ❤️ por <a className='underline hover:text-primary-slate-20' target='_blank' rel='noopener noreferrer' href='https://github.com/cosmoart'>Cosmo</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
