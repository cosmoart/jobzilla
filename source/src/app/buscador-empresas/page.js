'use client'

import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function BuscadorEmpresas () {
	const [companies, setCompanies] = useState([])
	const [error, setError] = useState(false)
	const [loading, setloading] = useState(false)

	function handleSubmit (e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		setloading(true)
		if (formData.get('search').length > 1) {
			axios('/api/companies', {
				params: {
					search: formData.get('search')
				}
			})
				.then(res => setCompanies(res.data.items))
				.catch(() => setError(true))
				.finally(() => setloading(false))
		}
	}

	return (
		<main>
			<h1 className='text-lg md:text-2xl my-4 text-center font-semibold'>Buscador de empresas</h1>
			<form onSubmit={handleSubmit} className='flex flex-col px-4 md:flex-row gap-4 items-center justify-center max-w-4xl mx-auto'>
				<input type='text' placeholder='Buscar empresa' name='search' className=' p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 flex-grow focus:ring-blue-600 focus:border-transparent z-10' />
				<button type='submit' className='py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'>Buscar</button>
			</form>
			{
				loading && <p className='text-center'>Cargando...</p>
			}
			{
				error && <p className='text-center'>Ha ocurrido un error</p>
			}
			{
				companies.length && !loading && !error > 0 && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 mt-8'>
						{
							companies.map((company, i) => (
								<section className='bg-blue-300 p-4 rounded-md overflow-hidden' key={i}>
									<Image className='rounded-md'
										src={company.logo?.includes('null') ? '/company-logo.png' : company.logo}
										width={100} height={100}
										alt={`${company.name} logo`} />
									<h3 className='text-xl font-medium'>{company.name}</h3>
									<p className='max-h-60'>{company.description}</p>
								</section>
							))
						}
					</div>
				)
			}
			{
				companies?.length === 0 && !loading && !error && (
					<p className='text-center'>No se han encontrado resultados</p>
				)
			}
		</main>
	)
}
