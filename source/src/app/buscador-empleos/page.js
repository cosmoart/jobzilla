'use client'

import useFetchData from '@/hooks/useFetchdata'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import JobCard from '@/components/buscador-empleos/JobCard'
import Form from '@/components/buscador-empleos/Form'
import JobsNavBar from '@/components/buscador-empleos/JobsNavBar'
import ErrorMessage from '@/components/ErrorMessage'

const JobsMap = dynamic(() => import('@/components/JobsMap'), { ssr: false })

export default function BuscadorEmpleos () {
	const [params, setParams] = useState({})
	const [data, loading, error] = useFetchData('/api/jobs', params)
	const [formGrid, setFormGrid] = useState(1)

	return (
		<main className='section items-center justify-between p-3 flex-grow basis-0' data-dark-header='true'>

			<Form setParams={setParams} />

			{
				!loading
					? <JobsNavBar data={data} setFormGrid={setFormGrid} />
					: <div className='h-12' />
			}

			<div className={`flex ${error ? 'min-h-[20rem]' : ' h-[90vh]'}`}>
				<ul className={`grid gap-2 px-4 flex-grow basis-0 overflow-auto ${formGrid === 1 ? ' grid-cols-1' : 'grid-cols-2'}`}>
					{
						loading && [1, 2, 3, 4, 5].map((_, i) => (
							<li key={i} className='p-4 rounded-md border animate-pulse flex gap-4'>
								<div className=' bg-slate-300 dark:bg-slate-500 rounded w-16 h-16 aspect-square'></div>
								<div className='w-full'>
									<div className='h-4 bg-slate-300 dark:bg-slate-500 rounded w-3/4'></div>
									<div className='h-4 bg-slate-300 dark:bg-slate-500 rounded w-1/4 mt-2'></div>
									<div className='h-12 bg-slate-300 dark:bg-slate-500 rounded w-1/2 mt-2'></div>
								</div>
							</li>
						))
					}
					{
						error && <ErrorMessage />
					}
					{
						!loading && !error && data.items.length > 0 && data.items.map((job) => (
							<JobCard key={job.id} job={job} />
						))
					}
				</ul>
				{
					loading && <div className='w-[40vw] bg-slate-300 dark:bg-slate-500 rounded h-full animate-pulse'></div>
				}
				{
					!loading && !error && data.items.length > 0 && <JobsMap jobs={data.items} />
				}
			</div>
		</main>
	)
}
