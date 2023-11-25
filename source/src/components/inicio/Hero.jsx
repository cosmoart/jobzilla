'use client'

import { useRouter } from 'next/navigation'
import regiones from '@/assets/json/regiones.json'
import Combobox from '../ui/combobox'

export default function Hero () {
	const router = useRouter()

	function handleSubmit (e) {
		e.preventDefault()
		const data = new FormData(e.target)
		const q = data.get('q')
		const region = data.get('region')
		router.push(`/buscador-empleos?query=${q}&region=${region}`)
	}

	return (
		<main className='h-[60vh] px-3 section flex items-start max-h-[30rem] after:top-0 after:absolute after:w-full after:bg-center after:right-0 after:h-[85vh] after:bg-fixed after:-z-10 after:bg-cover after:blur-[2px] after:brightness-75 after:bg-[url(/home-images/image2.webp)]' data-dark-header='false'>
			<div className='mx-auto max-w-4xl flex flex-col gap-6 justify-center h-full'>
				<h1 className='text-2xl md:text-5xl font-bold text-white text-center'>Busca el trabajo de tus sueños</h1>

				<form className='flex flex-col sm:flex-row gap-2 items-center' onSubmit={handleSubmit}>
					<label className='w-full shrink-[0.6] text-base'>
						<span className='text-white'>Busco ofertas de...</span>
						<input type='text' placeholder='Desarrollador, diseñador, mesero...' name='q' className='border px-4 border-slate-300 rounded-md p-2 w-full shrink-[0.6]' />
					</label>

					<label className='w-[570px]'>
						<span className='text-white text-base'>En...</span>
						<Combobox items={regiones} placeholder='Buscar región...' />
					</label>
					<button className='bg-blue-600 mt-auto hover:bg-blue-700 text-white rounded-md py-2 border-[1px] border-blue-600 text-base px-7'>Buscar</button>
				</form>

			</div>
			<style jsx>{`
        main::after {
					content: '';
					background: url(/home-images/image${Math.floor(Math.random() * 5) + 1}.webp);
					background-size: cover;
					background-position: center;
				}
      `}</style>
		</main>
	)
}
