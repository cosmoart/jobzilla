'use client'

import formCountryFilter from '@/assets/json/formCountryFilter.json'
import { useRouter } from 'next/navigation'

export default function Hero () {
	const router = useRouter()

	function handleSubmit (e) {
		e.preventDefault()
		const data = new FormData(e.target)
		const q = data.get('q')
		const country = data.get('country')
		router.push(`/buscador-empleos?q=${q}&country=${country}`)
	}

	return (
		<main className='h-[60vh] px-3 section flex items-start max-h-[30rem] after:top-0 after:absolute after:w-full after:bg-center after:right-0 after:h-[85vh] after:bg-fixed after:-z-10 after:bg-cover after:blur-[2px] after:brightness-75 after:bg-[url("https://images.pexels.com/photos/209726/pexels-photo-209726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]' data-dark-header='false'>
			<div className='mx-auto max-w-7xl flex flex-col gap-6 justify-center h-full'>
				<h1 className='text-2xl md:text-5xl font-bold text-white'>Busca el trabajo de tus sueños</h1>

				<form className='flex flex-col sm:flex-row gap-2' onSubmit={handleSubmit}>
					<input type='text' placeholder='Desarrollador, diseñador, mesero...' name='q' className='border px-4 border-gray-300 rounded-md p-2 w-full shrink-[0.6]' />
					<select name='country' defaultValue='espana' id='country' className='w-full p-1 bg-gray-100 rounded-md'>
						<option value='_' disabled>País</option>
						{
							formCountryFilter.map((item, index) => (
								<option key={index} value={item.key}>{item.value}</option>
							))
						}
					</select>
					<button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4'>Buscar</button>
				</form>

			</div>
		</main>
	)
}
