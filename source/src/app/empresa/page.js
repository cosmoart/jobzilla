'use client'

import useFetchData from '@/hooks/useFetchdata'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Empresa () {
	const searchParams = useSearchParams()
	const [params] = useState({ sdrn: searchParams.get('sdrn') })
	const [companyInfo, companyLoading, companyError] = useFetchData('/api/company', params)

	if (companyLoading) {
		return (
			<div className='relative max-w-3xl mx-auto px-6 lg:px-0 w-full animate-pulse' >
				<div className='bg-gray-300 rounded w-full h-[300px]'></div>
				<div className=' bg-gray-300 rounded w-52 h-52 ring-4 ring-white absolute top-[32%]'></div>
				<div className='w-full ml-56 mt-4'>
					<div className='h-5 bg-gray-300 rounded w-1/4 mt-2'></div>
					<div className='h-5 bg-gray-300 rounded w-1/5 mt-2'></div>
					<div className='h-5 bg-gray-300 rounded w-1/5 mt-2'></div>
				</div>
				<div className='bg-gray-300 rounded w-full h-52 mt-14'></div>
			</div >
		)
	}

	if (companyError || !companyInfo) {
		return <p className='m-8'>Ooops! Ha ocurrido un error, intentalo de nuevo más tarde</p>
	}

	return (
		<div className='max-w-6xl mx-auto px-6 lg:px-0'>
			<a href={companyInfo.corporativeWebUrl} className='relative' target='_blank' rel='noopener noreferrer'>
				{
					companyInfo.headerImageUrl && (<Image src={companyInfo.headerImageUrl} alt={companyInfo.name} width={800} height={300} className='rounded-b-md object-cover h-[300px]' />)
				}
				<div className={`flex ${companyInfo.headerImageUrl ? 'ml-52 mb-3' : ''}`}>
					<Image className={`rounded-md ring-2 ring-slate-200 left-0 ${companyInfo.headerImageUrl ? 'absolute top-[52%]' : 'inline-block my-6'}`} src={companyInfo.logoUrl ?? '/company-logo.png'} alt={companyInfo.name} width={200} height={200} />
					<div className='flex justify-center flex-col p-4'>
						<h1 className={`text-2xl font-semibold ${companyInfo.headerImageUrl ? '' : 'inline-block'}`}>
							{companyInfo.name}
						</h1>
						<p className='font-medium inline-block'>{companyInfo.province} - {companyInfo.country}</p>
						<p className='font-medium inline-block'>Empleados: {companyInfo.workers}</p>
					</div>
				</div>
			</a>
			<div className='mb-20 max-w-3xl whitespace-pre-line' dangerouslySetInnerHTML={{ __html: companyInfo.description }} />
			{
				companyInfo.media && companyInfo.media.length > 0 && (
					<>
						<h2 className='text-xl font-semibold mb-4'>Galería</h2>
						{
							companyInfo.media.map((media, i) => (
								<div key={i} className='relative mb-4'>
									{
										media.type === 'IMAGE' && (
											<Image src={media.url} alt={'Imagen ' + i} width={800} height={400} />
										)
									}
									{
										media.type === 'VIDEO' && (
											<iframe width='100%' height='500px' src={media.url.replace('watch?v=', 'embed/')} title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen></iframe>
										)
									}
								</div>
							))
						}
					</>
				)
			}
		</div>
	)
}
