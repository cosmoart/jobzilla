import Image from 'next/image'
import Link from 'next/link'
import githubLogo from '@/assets/icons/github.svg'

export default function Footer () {
	return (
		<footer className='py-5 px-6 bg-white dark:bg-slate-800'>
			<div className='mx-auto max-w-6xl w-full flex flex-col sm:flex-row justify-between items-center gap-8 text-center md:text-left'>
				<Link href='/' className='sm:self-start invert dark:invert-0'>
					<Image src='/favicon.svg' alt='JobZilla Logo' width={50} height={50} />
				</Link>
				<nav className='flex flex-col flex-grow'>
					<Link href='/' className='hover:text-slate-700 dark:hover:text-white hover:translate-x-2 transition-all'>
						Inicio
					</Link>
					<Link href='/buscador-empleos' className='hover:text-slate-700 dark:hover:text-slate-200  hover:translate-x-2 transition-all'>
						Buscar empleo
					</Link>
					<Link href='/buscador-empresas' className='hover:text-slate-700 dark:hover:text-slate-200  hover:translate-x-2 transition-all'>
						Buscar empresas
					</Link>
					<Link href='/buscador-empresas' className='hover:text-slate-700 dark:hover:text-slate-200  hover:translate-x-2 transition-all'>
						Información
					</Link>
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
