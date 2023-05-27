'use client'

import { useEffect } from 'react'
import categories from '@/assets/json/categories.json'
import Link from 'next/link'
import Image from 'next/image'
import arrowIcon from '@/assets/icons/arrow.svg'

export default function JobsCategories () {
	useEffect(() => {
		const scrollX = document.querySelector('#scrollX')
		scrollX.addEventListener('wheel', (e) => {
			e.preventDefault()
			scrollX.scrollLeft += e.deltaY
		}, { passive: false })
	}, [])

	return (
		<section className='my-10'>
			<h2 className='text-2xl text-center font-semibold my-4'>Categorias</h2>
			<div className='relative'>
				<button className='absolute z-10 top-1/2 -translate-y-1/2 left-0 rotate-180 bg-gradient-to-r from-transparent to-white h-full p-2 ' onClick={() => { document.querySelector('#scrollX').scrollLeft -= 100 }}>
					<Image src={arrowIcon} alt='Left Icon' width={20} height={20} />
				</button>
				<div className='flex gap-4 overflow-auto relative px-8' id='scrollX'>
					{categories.map((category, index) => (
						<Link href={`/buscador-empleos?category=${category.value}`} key={index} className='flex items-center border-4 min-w-max justify-center rounded-md py-4 px-6 skew-x-12'
							style={{ borderColor: category.color ?? 'rgb(59 130 246)' }}>
							<span className='font-bold -skew-x-12'>{category.value}</span>
						</Link>
					))}
				</div>
				<button className='absolute z-10 top-1/2 -translate-y-1/2 right-0 bg-gradient-to-r from-transparent to-white h-full p-2 ' onClick={() => { document.querySelector('#scrollX').scrollLeft += 100 }}>
					<Image src={arrowIcon} alt='Right Icon' width={20} height={20} />
				</button>
			</div>
		</section >
	)
}
