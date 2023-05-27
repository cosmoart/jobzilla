'use client'

import Link from 'next/link'
// import dynamic from 'next/dynamic'
import Image from 'next/image'
import useFetchData from '@/hooks/useFetchdata'

// const JobsMap = dynamic(() => import('@/components/JobsMap'), { ssr: false })

export default function BuscadorEmpleos () {
	const [data, loading, error] = useFetchData('/api/jobs')
	console.log('gola')
	if (error) {
		return <div>Ha ocurrido un error</div>
	}

	return (
		<main className='section min-h-screen items-center justify-between p-3 flex-grow basis-0' data-dark-header='true'>

			<form className='flex gap-2 mx-auto max-w-5xl'>
				<input type='text' placeholder='Buscar trabajo' name='job' className='border border-gray-300 rounded-md p-3 w-full' required />
				<input className='p-3 border rounded-md' list='places' id='placesID' name='place' placeholder='Toda España' required />
				<datalist id='places'>
					<option value='Madrid'></option>
					<option value='Barcelona'></option>
					<option value='Valencia'></option>
					<option value='Sevilla'></option>
					<option value='Zaragoza'></option>
				</datalist>
				<button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-6'>Buscar</button>
			</form>

			<p className='whitespace-pre-line'>
				Filtros:
				Lugar:
				- Provincia
				- Ciudad
				- Pais
				Categoria:
				- Subcategoria
				- Categoria
				Salario:
				- Minimo
				- Maximo
				- Periodo
				Estudios
				Typo de contrato
				Experiencia minima
				Jornada
				Fecha:
				-  Ultimos 3 dias
				-  Ultima semana
				Teletrabajo
			</p>

			<div className='flex mt-6'>
				<ul className='flex flex-col gap-2 px-4 flex-grow basis-0 h-[77vh] overflow-auto'>
					{
						loading && <li className='p-4 rounded-md border'>Cargando...</li>
					}
					{
						error && <li className='p-4 rounded-md border'>Ha ocurrido un error</li>
					}
					{
						!loading && !error && data.length > 0 && data.map((job) => (
							<li key={job.id} className='p-4 rounded-md border hover:bg-blue-200 transition-colors'>
								<Link rel='prefetch' href={`/oferta/${job.id}`} className='flex gap-5 items-center'>
									<Image src={job.author?.logoUrl ?? '/company-logo.png'} alt='' width={50} height={50} className='rounded-full aspect-square' />
									<div>
										<h2 className='text-xl font-bold'>{job.title}</h2>
										<p>{job.requirementMin}</p>
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
