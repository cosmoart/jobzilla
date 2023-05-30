'use client'

import useFetchData from '@/hooks/useFetchdata'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import JobCard from '@/components/buscador-empleos/JobCard'
import Form from '@/components/buscador-empleos/Form'

const JobsMap = dynamic(() => import('@/components/JobsMap'), { ssr: false })

export default function BuscadorEmpleos () {
	const [url, setUrl] = useState('/api/jobs')
	const [params, setParams] = useState({})
	const [showForm, setShowForm] = useState(true)
	const [formGrid, setFormGrid] = useState(1)
	const [data, loading, error] = useFetchData(url, params)

	const searchParams = useSearchParams()
	// console.log('searchParams', Object.fromEntries(searchParams))

	if (error) {
		return <div>Ha ocurrido un error</div>
	}

	return (
		<main className='section items-center justify-between p-3 flex-grow basis-0' data-dark-header='true'>

			<Form showForm={showForm} />

			<nav className='flex justify-between items-center'>
				<p className='px-4 my-2 mt-6'>
					{
						!loading && !error && `Ofertas: ${data.totalResults?.toLocaleString()}`
					}
				</p>

				<div className='flex gap-3'>
					<button className='rounded text-white py-1 px-2 bg-blue-500 hover:bg-blue-600' onClick={() => setFormGrid(1)}>
						1
					</button>
					<button className='rounded text-white py-1 px-2 bg-blue-500 hover:bg-blue-600' onClick={() => setFormGrid(2)}>
						2
					</button>
				</div>

				<button className='bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md py-2 px-4 my-2' onClick={() => setShowForm(!showForm)}>
					{
						showForm ? 'Ocultar filtros' : 'Mostrar filtros'
					}
				</button>
			</nav>

			<div className='flex h-[100vh]'>
				<ul className={`grid gap-2 px-4 flex-grow basis-0 h-[100vh] overflow-auto ${formGrid === 1 ? ' grid-cols-1' : 'grid-cols-2'}`}>
					{
						loading && <li className='p-4 rounded-md border'>Cargando...</li>
					}
					{
						error && <li className='p-4 rounded-md border'>Ha ocurrido un error</li>
					}
					{
						!loading && !error && data.items.length > 0 && data.items.map((job) => (
							<JobCard key={job.id} job={job} />
						))
					}
				</ul>

				{
					!loading && !error && data.items.length > 0 && <JobsMap jobs={data.items} />
				}
			</div>
		</main>
	)
}
