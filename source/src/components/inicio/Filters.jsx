import Image from 'next/image'
import Link from 'next/link'

export default function Filters () {
	const cities = [
		{
			name: 'Madrid',
			link: '/buscador-empleos?city=madrid',
			img: 'https://www.spain.info/.content/imagenes/cabeceras-grandes/madrid/calle-gran-via-madrid-s333961043.jpg'
		},
		{
			name: 'Barcelona',
			link: '/buscador-empleos?city=barcelona',
			img: 'https://hips.hearstapps.com/hmg-prod/images/sagrada-familia-and-barcelona-skyline-at-sunrise-royalty-free-image-1690200169.jpg?crop=0.611xw:1.00xh;0.207xw,0&resize=640:*'
		},
		{
			name: 'Valencia',
			link: '/buscador-empleos?city=valencia',
			img: 'https://www.spain.info/.content/imagenes/cabeceras-grandes/valencia/ciudad-artes-ciencias-valencia-c-luca-bravo-u-UyUjtbu5vj4.jpg'
		},
		{
			name: 'Bilbao',
			link: '/buscador-empleos?city=bilbao',
			img: 'https://a1.eestatic.com/cronicavasca/2023/08/10/sociedad/785681608_8418574_1706x960.jpg'
		}
	]

	const filters = [
		{
			name: '35.000€ o más',
			link: '/buscador-empleos?salary=35000',
			img: 'https://picsum.photos/id/237/500/600'
		},
		{
			name: 'Media jornada',
			link: '/buscador-empleos?contract=media-jornada',
			img: 'https://picsum.photos/id/27/500/600'
		},
		{
			name: 'Teletrabajo',
			link: '/buscador-empleos?remote=true',
			img: 'https://picsum.photos/id/26/500/600'
		},
		{
			name: 'Directivo',
			link: '/buscador-empleos?position=directivo',
			img: 'https://picsum.photos/id/28/500/600'
		}
	]

	return (
		<section className='mb-36 mt-24 mx-auto max-w-7xl px-6 lg:px-0'>

			<div>
				<div className='flex justify-between items-center'>
					<h2 className='text-2xl font-semibold my-4'>Trabaja cerca de casa</h2>
					<Link className='underline' href='/buscador-empleos'>+ Ciudades</Link>
				</div>
				<div className='flex justify-between gap-4 flex-wrap'>
					{cities.map(city => (
						<article key={city.name} className='rounded-md bg-slate-200 p-4 flex-grow transition-transform hover:scale-[1.02]'>
							<Link href={city.link} className='flex h-full flex-col'>
								<Image src={city.img} alt={city.name} className='object-cover flex-grow rounded-md w-full ' width={200} height={400} />
								<h3 className='text-xl font-semibold mt-2'>{city.name}</h3>
							</Link>
						</article>
					))}
				</div>
			</div>

			<div className='mt-14'>
				<div className='flex justify-between items-center'>
					<h2 className='text-2xl font-semibold my-4'>Encuentra un trabajo de...</h2>
					<Link className='underline' href='/buscador-empleos'>+ Filtros</Link>
				</div>
				<div className='flex justify-between gap-4 flex-wrap'>
					{filters.map(filter => (
						<article key={filter.name} className='rounded-md bg-slate-200 p-4 flex-grow transition-transform hover:scale-[1.02]'>
							<Link href={filter.link} className='flex h-full flex-col'>
								<Image src={filter.img} alt={filter.name} className='object-cover flex-grow rounded-md w-full ' width={200} height={400} />
								<h3 className='text-xl font-semibold mt-2'>{filter.name}</h3>
							</Link>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
