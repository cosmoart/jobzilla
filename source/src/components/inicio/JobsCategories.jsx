'use client'

import { useEffect } from 'react'
import categories from '@/assets/json/categories.json'

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
			<div className='flex gap-4 overflow-auto' id='scrollX'>
				{categories.map((category, index) => (
					<div key={index} className='flex items-center min-w-max justify-center rounded-md py-4 px-6'
						style={{ backgroundColor: category.color ?? 'rgb(59 130 246)' }}>
						{/* <i className={`${category.icon} text-4xl text-white`}></i> */}
						<span className='text-white'>{category.value}</span>
					</div>
				))}
			</div>
		</section>
	)
}
