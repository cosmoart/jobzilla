'use client'

import useFetchData from '@/hooks/useFetchdata'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Empresa () {
	const searchParams = useSearchParams()
	const [url, setUrl] = useState('/api/company')
	const [params, setParams] = useState({ sdrn: searchParams.get('sdrn') })

	const [data, loading, error] = useFetchData(url, params)

	return (
		<div className='max-w-6xl mx-auto'>
			{loading && <p>Loading...</p>}
			{error && <p>Error</p>}
			{
				!loading && !error && data && (
					<>
						<Image src={data.headerImageUrl} alt={data.name} width={800} height={200} />
						<Image src={data.logoUrl} alt={data.name} width={200} height={200} />
						<h1>{data.name}</h1>
						<div dangerouslySetInnerHTML={{ __html: data.description }} />
					</>
				)
			}
		</div>
	)
}
