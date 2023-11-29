'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ErrorMessage from '@/components/ErrorMessage'
import { Separator } from '@/components/ui/separator'
import { useSearchParams } from 'next/navigation'
import useFetchData from '@/hooks/useFetchdata'
import '@smastrom/react-rating/style.css'
import { useState } from 'react'
import Skeleton from './Skeleton'
import Gallery from './Gallery'
import Header from './Header'

export default function Empresa () {
	const searchParams = useSearchParams()
	const [params] = useState({ sdrn: searchParams.get('sdrn') })
	const [companyInfo, companyLoading, companyError] = useFetchData('/api/companies', params)

	if (companyLoading) return <Skeleton />
	if (companyError || !companyInfo) return <ErrorMessage />

	return (
		<div className='max-w-5xl mx-auto px-6 2xl:px-0 w-full mb-20'>

			<Header companyInfo={companyInfo} />

			<Separator />

			<Tabs defaultValue='description' className='w-full mt-3 '>
				<TabsList className='pb-0 mb-3'>
					<TabsTrigger value='description' className='text-[17px] rounded-b-none px-7 shadow-none'>Descripción</TabsTrigger>
					{companyInfo.media && companyInfo.media.length > 0 &&
						<TabsTrigger value='gallery' className='text-[17px] rounded-b-none px-5 shadow-none'>Galería</TabsTrigger>}
				</TabsList>
				<TabsContent value='description'>
					<div className='mb-20 whitespace-pre-line' dangerouslySetInnerHTML={{ __html: companyInfo.description }} />
				</TabsContent>
				<TabsContent value='gallery'>
					{
						companyInfo.media && companyInfo.media.length > 0 && <Gallery media={companyInfo.media} />
					}
				</TabsContent>
			</Tabs>
		</div>
	)
}
