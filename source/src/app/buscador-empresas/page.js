'use client'

import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import ErrorMessage from '@/components/ErrorMessage'
import { Search } from 'lucide-react'
import Skeleton from '@/components/buscador-empresas/Skeleton'

export default function BuscadorEmpresas () {
	const [companies, setCompanies] = useState(null)
	const [error, setError] = useState(false)
	const [loading, setloading] = useState(false)
	let debounceTimer

	function handleSearch (query) {
		setloading(true)
		setError(false)
		axios('/api/companies', {
			params: {
				search: query
			}
		})
			.then(res => setCompanies(res.data.items))
			.catch(() => setError(true))
			.finally(() => setloading(false))
	}

	function handleInputChangue (e) {
		if (e.target.value.trim().length < 1) {
			setCompanies(null)
			return setError(false)
		}
		clearTimeout(debounceTimer)
		debounceTimer = setTimeout(() => handleSearch(e.target.value.trim()), 500)
	}

	const errorText = error ? 'Ha ocurrido un error' : companies?.length < 1 && companies !== null ? 'No se han encontrado resultados' : ''
	return (
		<main className='max-w-7xl px-6 2xl:px-0 mx-auto min-h-[calc(100vh-64px)] empresas-main'>
			<h1 className='text-xl md:text-3xl mb-1 pt-12 text-center font-semibold text-white'>Buscador de empresas</h1>
			<p className='text-center text-base md:text-lg mb-6 text-white'>Consulta más de 2 millones de opiniones de más de 9.000 empresas</p>
			<form className='flex flex-row gap-4 items-center justify-center max-w-2xl mx-auto dark:text-slate-900 border bg-white overflow-hidden border-slate-300 rounded-lg focus:outline-none focus:ring-2'>
				<Search className='ml-5' />
				<input type='text' placeholder='Infojobs, Adevinta, Adidas... ' name='search' className='w-full  sm:w-auto py-2 px-4   flex-grow focus:ring-blue-600 focus:border-transparent z-10' required onChange={handleInputChangue} />
			</form>
			{
				loading && <Skeleton />
			}
			{
				!loading && errorText && companies !== null && <ErrorMessage message={errorText} className='mt-20' />
			}
			{
				companies && companies.length > 0 && !loading && !error && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto  mt-12 mb-20'>
						{
							companies.map((company, i) => (
								<Link key={i} href={`/empresa?sdrn=${company.sdrn}`} className='bg-slate-200 p-5 rounded-md overflow-hidden hover:scale-[1.02] transition-all'>
									<section className='h-full'>
										<div className='flex gap-4 items-center h-full'>
											<Image className='rounded-md'
												src={company.logo?.includes('null') ? '/company-logo.png' : company.logo}
												width={80} height={80}
												alt={`${company.name} logo`} />
											<div>
												<h3 className='text-lg font-medium'>{company.name}</h3>
												<p className='companyShortDescription text-sm mt-2 max-h-60' title={company.description}>{company.description}</p>
											</div>
										</div>
									</section>
								</Link>
							))
						}
					</div>
				)
			}
		</main>
	)
}
