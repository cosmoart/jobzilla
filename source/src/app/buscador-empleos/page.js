'use client'

import useFetchData from '@/hooks/useFetchdata'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import JobCard from '@/components/buscador-empleos/JobCard'
import Form from '@/components/buscador-empleos/Form'
import JobsNavBar from '@/components/buscador-empleos/JobsNavBar'

const JobsMap = dynamic(() => import('@/components/JobsMap'), { ssr: false })

export default function BuscadorEmpleos () {
	const [url, setUrl] = useState('/api/jobs')
	const [params, setParams] = useState({})
	const [formGrid, setFormGrid] = useState(1)
	const [data, loading, error] = useFetchData(url, params)

	if (error) {
		return <div>Ha ocurrido un error</div>
	}

	return (
		<main className='section items-center justify-between p-3 flex-grow basis-0' data-dark-header='true'>

			<Form setParams={setParams} />

			{
				!loading && <JobsNavBar data={data} setFormGrid={setFormGrid} />
			}

			<div className='flex h-[100vh]'>
				<ul className={`grid gap-2 px-4 flex-grow basis-0 h-[100vh] overflow-auto ${formGrid === 1 ? ' grid-cols-1' : 'grid-cols-2'}`}>
					{
						loading && [1, 2, 3, 4, 5].map((_, i) => (
							<li key={i} className='p-4 rounded-md border animate-pulse flex gap-4'>
								<div className=' bg-gray-300 rounded w-16 h-16 aspect-square'></div>
								<div className='w-full'>
									<div className='h-4 bg-gray-300 rounded w-3/4'></div>
									<div className='h-4 bg-gray-300 rounded w-1/4 mt-2'></div>
									<div className='h-12 bg-gray-300 rounded w-1/2 mt-2'></div>
								</div>
							</li>
						))
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
