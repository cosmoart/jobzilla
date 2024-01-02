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
		<main className='h-[60vh] px-6 section flex items-start max-h-[30rem] after:top-0 after:absolute after:w-full after:bg-center after:right-0 after:h-[85vh] after:bg-fixed after:-z-10 after:bg-cover after:blur-[2px] after:brightness-75 after:bg-[url(/home-images/image2.webp)]' data-dark-header='false'>
			<div className='mx-auto w-full max-w-4xl flex flex-col gap-6 justify-center h-full'>
				<h1 className='text-2xl md:text-5xl font-bold text-white text-center'>Busca el trabajo de tus sueños</h1>

				<form className='flex flex-col sm:flex-row gap-2 items-center' onSubmit={handleSubmit}>
					<label className='w-full text-base'>
						<span className='text-white'>Busco ofertas de...</span>
						<input type='text' placeholder='Desarrollador, diseñador, mesero...' name='q' className='border px-4 border-gray-300 rounded-md p-2 w-full dark:bg-gray-800' />
					</label>

					<label className='flex flex-col w-full sm:w-auto min-w-56'>
						<span className='text-white text-base'>En...</span>
						<Combobox items={regiones} placeholder='Buscar región...' className='w-full sm:w-auto' />
					</label>
					<button className='bg-blue-600 mt-auto hover:bg-blue-700 text-white rounded-md py-2 border-[1px] border-blue-600 text-base px-7 w-full sm:w-auto'>Buscar</button>
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
