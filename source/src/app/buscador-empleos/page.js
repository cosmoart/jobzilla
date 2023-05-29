'use client'

import useFetchData from '@/hooks/useFetchdata'
import { SelectBox, SelectBoxItem, MultiSelectBox, MultiSelectBoxItem, TextInput } from '@tremor/react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
// import dynamic from 'next/dynamic'

// const JobsMap = dynamic(() => import('@/components/JobsMap'), { ssr: false })

export default function BuscadorEmpleos () {
	const [url, setUrl] = useState('/api/jobs')
	const [params, setParams] = useState({})
	const [data, loading, error] = useFetchData(url, params)
	const searchParams = useSearchParams()

	console.log('searchParams', Object.fromEntries(searchParams))

	function handleSubmit (e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		const job = formData.get('job')
		const place = formData.get('place')
		console.log(formData)
		console.log('handleSubmit', job, place)
		setParams({ q: job, city: place })
	}

	if (error) {
		return <div>Ha ocurrido un error</div>
	}

	return (
		<main className='section min-h-screen items-center justify-between p-3 flex-grow basis-0' data-dark-header='true'>

			<form className='flex flex-col gap-3 mx-auto max-w-6xl' onSubmit={handleSubmit}>
				<fieldset className='flex gap-3'>
					<legend className='hidden'>Busca por palabras clave y lugar</legend>
					<TextInput placeholder='Buscar trabajo...' name='job' required className='p-1 shrink-[0.2]' />

					<SelectBox defaultValue='1' name='country'>
						<SelectBoxItem value='1' text='España' className='h-full' />
						<SelectBoxItem value='2' text='Portugal' className='h-full' />
						<SelectBoxItem value='3' text='Francia' className='h-full' />
						<SelectBoxItem value='4' text='Alemania' className='h-full' />
					</SelectBox>

					<MultiSelectBox >
						<MultiSelectBoxItem value='1' text='Andalucía' />
						<MultiSelectBoxItem value='2' text='Aragón' />
						<MultiSelectBoxItem value='3' text='Asturias' />
						<MultiSelectBoxItem value='4' text='Baleares' />
					</MultiSelectBox>

					<MultiSelectBox>
						<MultiSelectBoxItem value='1' text='Madrid' />
						<MultiSelectBoxItem value='2' text='Barcelona' />
						<MultiSelectBoxItem value='3' text='Valencia' />
						<MultiSelectBoxItem value='4' text='Sevilla' />
					</MultiSelectBox>
					<button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-6'>Buscar</button>
				</fieldset>

				<fieldset className='flex gap-3'>
					<SelectBox defaultValue='1' name='country'>
						<SelectBoxItem value='1' text='Categoria' />
						<SelectBoxItem value='2' text='Portugal' />
						<SelectBoxItem value='3' text='Francia' />
						<SelectBoxItem value='4' text='Alemania' />
					</SelectBox>

					<SelectBox defaultValue='1' name='country'>
						<SelectBoxItem value='1' text='Subcategoria' />
						<SelectBoxItem value='2' text='Portugal' />
						<SelectBoxItem value='3' text='Francia' />
						<SelectBoxItem value='4' text='Alemania' />
					</SelectBox>

					<SelectBox defaultValue='1' name='country'>
						<SelectBoxItem value='1' text='Teleworking' />
						<SelectBoxItem value='2' text='Portugal' />
						<SelectBoxItem value='3' text='Francia' />
						<SelectBoxItem value='4' text='Alemania' />
					</SelectBox>

					<SelectBox defaultValue='1' name='country'>
						<SelectBoxItem value='1' text='Contrato' />
						<SelectBoxItem value='2' text='Portugal' />
						<SelectBoxItem value='3' text='Francia' />
						<SelectBoxItem value='4' text='Alemania' />
					</SelectBox>

					<SelectBox defaultValue='1' name='country'>
						<SelectBoxItem value='1' text='Jornada' />
						<SelectBoxItem value='2' text='Portugal' />
						<SelectBoxItem value='3' text='Francia' />
						<SelectBoxItem value='4' text='Alemania' />
					</SelectBox>
				</fieldset>
				<fieldset className='flex gap-3'>
					<div className='flex gap-2 flex-grow w-full text-center shrink-[0.7] items-center'>
						<input id='minmax-range' type='range' min='0' max='10' value='5' class='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700' />
						<p className='whitespace-pre'>1000 - 2000</p>
					</div>
					<SelectBox defaultValue='1' name='country'>
						<SelectBoxItem value='1' text='Estudios' />
						<SelectBoxItem value='2' text='Portugal' />
						<SelectBoxItem value='3' text='Francia' />
						<SelectBoxItem value='4' text='Alemania' />
					</SelectBox>

					<SelectBox defaultValue='1' name='country'>
						<SelectBoxItem value='1' text='Fecha' />
						<SelectBoxItem value='2' text='Portugal' />
						<SelectBoxItem value='3' text='Francia' />
						<SelectBoxItem value='4' text='Alemania' />
					</SelectBox>

					<SelectBox defaultValue='1' name='country'>
						<SelectBoxItem value='1' text='Experiencia' />
						<SelectBoxItem value='2' text='Portugal' />
						<SelectBoxItem value='3' text='Francia' />
						<SelectBoxItem value='4' text='Alemania' />
					</SelectBox>
				</fieldset>
			</form>

			<p className='px-4 my-2 mt-6'>
				{
					!loading && !error && `Ofertas: ${data.totalResults?.toLocaleString()}`
				}
			</p>

			<div className='flex '>
				<ul className='flex flex-col gap-2 px-4 flex-grow basis-0 h-[85vh] overflow-auto'>
					{
						loading && <li className='p-4 rounded-md border'>Cargando...</li>
					}
					{
						error && <li className='p-4 rounded-md border'>Ha ocurrido un error</li>
					}
					{
						!loading && !error && data.items.length > 0 && data.items.map((job) => (
							<li key={job.id} className='p-4 rounded-md border hover:bg-blue-200 transition-colors'>
								<Link rel='prefetch' href={`/oferta/${job.id}`} className='flex gap-5 items-center'>
									<Image src={job.author?.logoUrl ?? '/company-logo.png'} alt='' width={50} height={50} className='rounded-full aspect-square' />
									<div>
										<h2 className='text-xl font-bold'>{job.title}</h2>
										<p className='jobShortDescription'>{job.requirementMin}</p>
									</div>
								</Link>
							</li>
						))
					}
				</ul>

				{
					// !loading && !error && jobs.length > 0 && <JobsMap jobs={jobs} />
				}
			</div>
		</main>
	)
}
