'use client'

import useFetchData from '@/hooks/useFetchdata'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import loaderIcon from '@/assets/icons/loader.svg'

export default function Empresa () {
	const searchParams = useSearchParams()
	const [url, setUrl] = useState('/api/company')
	const [params, setParams] = useState({ sdrn: searchParams.get('sdrn') })

	const [data, loading, error] = useFetchData(url, params)

	return (
		<div className='max-w-6xl mx-auto px-6 lg:px-0'>
			{loading && <Image src={loaderIcon} width={30} height={30} alt='Cargando...' className='mx-auto invert dark:invert-0 m-8' />}
			{error && <p className='m-8'>Ooops! Ha ocurrido un error, intentalo de nuevo más tarde</p>}
			{
				!loading && !error && data && (
					<>
						<a href={data.corporativeWebUrl} className='relative' target='_blank' rel='noopener noreferrer'>
							<Image src={data.headerImageUrl} alt={data.name} width={800} height={200} />
							<Image className='absolute rounded-md top-[55%]' src={data.logoUrl} alt={data.name} width={200} height={200} />
							<h1 className='text-2xl mt-4 ml-[13rem] mb-10'>{data.name}</h1>
						</a>
						<div className='mb-20 max-w-3xl' dangerouslySetInnerHTML={{ __html: data.description }} />
					</>
				)
			}
		</div>
	)
}
