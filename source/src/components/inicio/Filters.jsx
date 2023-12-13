import Image from 'next/image'
import Link from 'next/link'

import MadridImg from '@/assets/images/companies/madrid.webp'
import BarcelonaImg from '@/assets/images/companies/barcelona.webp'
import ValenciaImg from '@/assets/images/companies/valencia.webp'
import BilbaoImg from '@/assets/images/companies/bilbao.webp'

import MoneyImg from '@/assets/images/filters/money.webp'
import ContractImg from '@/assets/images/filters/contract.webp'
import RemoteImg from '@/assets/images/filters/remote.webp'
import DirectivoImg from '@/assets/images/filters/directivo.webp'

export default function Filters () {
	const cities = [
		{
			name: 'Madrid',
			link: '/buscador-empleos?city=madrid',
			img: MadridImg
		},
		{
			name: 'Barcelona',
			link: '/buscador-empleos?city=barcelona',
			img: BarcelonaImg
		},
		{
			name: 'Valencia',
			link: '/buscador-empleos?city=valencia',
			img: ValenciaImg
		},
		{
			name: 'Bilbao',
			link: '/buscador-empleos?city=bilbao',
			img: BilbaoImg
		}
	]

	const filters = [
		{
			name: '35.000€ o más',
			link: '/buscador-empleos?salary=35000',
			img: MoneyImg
		},
		{
			name: 'Media jornada',
			link: '/buscador-empleos?contract=media-jornada',
			img: ContractImg
		},
		{
			name: 'Teletrabajo',
			link: '/buscador-empleos?remote=true',
			img: RemoteImg
		},
		{
			name: 'Directivo',
			link: '/buscador-empleos?position=directivo',
			img: DirectivoImg
		}
	]

	return (
		<section className='mb-36 mt-24 mx-auto max-w-7xl px-6 2xl:px-0 '>

			<div>
				<div className='flex justify-between items-center'>
					<h2 className='text-2xl font-semibold my-4'>Trabaja cerca de casa</h2>
					<Link className='underline text-[17px] hover:opacity-80 transition-colors' href='/buscador-empleos'>+ Ciudades</Link>
				</div>
				<div className='flex justify-between gap-4 flex-wrap'>
					{cities.map(city => (
						<article key={city.name} className='rounded-lg shadow-md bg-slate-200 relative flex-grow transition-transform hover:scale-[1.01]'>
							<Link href={city.link} className='flex h-full flex-col'>
								<Image src={city.img} alt={city.name} className='object-cover flex-grow rounded-md w-full max-h-96' width={200} height={400} loading='lazy' />
								<h3 className='text-xl absolute bottom-0 left-0 px-5 py-1 rounded-tr-lg font-semibold mt-3 bg-white text-slate-900'>{city.name}</h3>
							</Link>
						</article>
					))}
				</div>
			</div>

			<div className='mt-16'>
				<div className='flex justify-between items-center'>
					<h2 className='text-2xl font-semibold my-4'>Encuentra un trabajo de...</h2>
					<Link className='underline text-[17px] hover:opacity-80 transition-colors' href='/buscador-empleos'>+ Filtros</Link>
				</div>
				<div className='flex justify-between gap-4 flex-wrap'>
					{filters.map(filter => (
						<article key={filter.name} className='rounded-lg shadow-md bg-slate-200 relative flex-grow transition-transform hover:scale-[1.01]'>
							<Link href={filter.link} className='flex h-full flex-col'>
								<Image src={filter.img} alt={filter.name} className='object-cover flex-grow rounded-md w-full max-h-96' width={200} height={400} loading='lazy' />
								<h3 className='text-xl absolute bottom-0 left-0 px-5 py-1 rounded-tr-lg font-semibold mt-3 bg-white text-slate-900'>{filter.name}</h3>
							</Link>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
