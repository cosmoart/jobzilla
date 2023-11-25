'use client'

import ErrorMessage from '@/components/ErrorMessage'
import useFetchData from '@/hooks/useFetchdata'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Empresa () {
	const searchParams = useSearchParams()
	const [params] = useState({ sdrn: searchParams.get('sdrn') })
	const [companyInfo, companyLoading, companyError] = useFetchData('/api/companies', params)

	if (companyLoading) {
		return (
			<div className='relative max-w-3xl mx-auto px-6 lg:px-0 w-full animate-pulse' >
				<div className='bg-slate-300 dark:bg-slate-500 rounded w-full h-[300px]'></div>
				<div className=' bg-slate-300 dark:bg-slate-500 rounded w-52 h-52 ring-4 dark:ring-slate-400	 ring-white absolute top-[32%]'></div>
				<div className='w-full ml-56 mt-4'>
					<div className='h-5 bg-slate-300 dark:bg-slate-500 rounded w-1/4 mt-2'></div>
					<div className='h-5 bg-slate-300 dark:bg-slate-500 rounded w-1/5 mt-2'></div>
					<div className='h-5 bg-slate-300 dark:bg-slate-500 rounded w-1/5 mt-2'></div>
				</div>
				<div className='bg-slate-300 dark:bg-slate-500 rounded w-full h-52 mt-14'></div>
			</div >
		)
	}
	console.log(companyInfo)
	if (companyError || !companyInfo) return <ErrorMessage />

	return (
		<div className='max-w-5xl mx-auto px-6 2xl:px-0 w-full mb-20'>

			<a href={companyInfo.corporativeWebUrl} className='companyGrid mb-10' target='_blank' rel='noopener noreferrer'>
				{
					companyInfo.headerImageUrl && (
						<div className='w-full relative h-[300px] headerHeroIMG -z-10'>
							<Image src={companyInfo.headerImageUrl} alt={companyInfo.name} fill={true} className='rounded-b-md object-cover headerHeroIMG' />
						</div>
					)
				}
				<Image className='headerLogo w-full rounded-md ring-2 ring-slate-200' src={companyInfo.logoUrl ?? '/company-logo.png'} alt={companyInfo.name} width={100} height={100} />
				<div className='flex headerDescription justify-center flex-col py-4 md:px-4'>
					<h1 className={`text-2xl font-semibold ${companyInfo.headerImageUrl ? '' : 'inline-block'}`}>
						{companyInfo.name}
					</h1>
					<p className='font-medium inline-block'>{companyInfo.province} - {companyInfo.country}</p>
					<p className='font-medium inline-block'>Empleados: {companyInfo.workers}</p>
				</div>
			</a>

			<div className='mb-20 whitespace-pre-line' dangerouslySetInnerHTML={{ __html: companyInfo.description }} />
			{
				companyInfo.media && companyInfo.media.length > 0 && (
					<>
						<h2 className='text-xl font-semibold mb-4'>Galería</h2>
						{
							companyInfo.media.map((media, i) => (
								<div key={i} className='relative mb-4'>
									{
										media.type === 'IMAGE' && (
											<Image src={media.url} alt={'Imagen ' + i} width={800} height={400} className='rounded' />
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
