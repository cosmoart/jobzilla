'use client'

import { useEffect } from 'react'
import categories from '@/assets/json/categories.json'
import Link from 'next/link'
import Image from 'next/image'
import arrowIcon from '@/assets/icons/arrow.svg'

export default function JobsCategories () {
	useEffect(() => {
		const scrollX = document.querySelector('#scrollX')
		scrollX.scrollLeft = scrollX.scrollWidth / 2 - scrollX.clientWidth / 2
		function scrollController (e) {
			e.preventDefault()
			scrollX.scrollLeft += e.deltaY * 2
		}
		scrollX.addEventListener('wheel', scrollController, { passive: false })
		return () => scrollX.removeEventListener('wheel', scrollController)
	}, [])

	return (
		<section className='my-20'>
			<h2 className='text-2xl text-center font-semibold my-4'>Categorías</h2>
			<div className='relative'>
				<button className='absolute z-10 top-1/2 -trangray-y-1/2 left-0 rotate-180 bg-gradient-to-r from-transparent to-white dark:to-gray-700 h-full p-2 ' onClick={() => { document.querySelector('#scrollX').scrollLeft -= 100 }}>
					<Image src={arrowIcon} alt='Left Icon' width={20} height={20} />
				</button>
				<div className='flex gap-4 overflow-auto relative px-8 py-2' id='scrollX'>
					{categories.map((category, index) => (
						<Link href={`/buscador-empleos?category=${category.key}`} key={index} className='flex   items-center border-4 min-w-max justify-center rounded-lg border-blue-500 hover:bg-transparent hover:text-blue-500 py-4 px-6 skew-x-12 relative text-white bg-blue-500'
							style={{ '--mainColor': category.color ?? 'rgb(59 130 246)' }}>
							<span className='font-bold -skew-x-12'>{category.value}</span>
						</Link>
					))}
				</div>
				<button className='absolute z-10 top-1/2 -trangray-y-1/2 right-0 bg-gradient-to-r from-transparent to-white dark:to-gray-700 h-full p-2 ' onClick={() => { document.querySelector('#scrollX').scrollLeft += 100 }}>
					<Image src={arrowIcon} alt='Right Icon' width={20} height={20} />
				</button>
			</div>
		</section >
	)
}
