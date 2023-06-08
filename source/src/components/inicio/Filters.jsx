import Link from 'next/link'

export default function Filters () {
	return (
		<section className='mb-36 mt-24 mx-auto max-w-6xl px-6 lg:px-0'>

			<div>
				<div className='flex justify-between items-center'>
					<h2 className='text-2xl font-semibold my-4'>Trabaja cerca de casa</h2>
					<Link className='underline' href='/buscador-empleos'>+ Ciudades</Link>
				</div>
				<div className='flex justify-between'>
					<article>
						<h3>Madrid</h3>
					</article>
					<article>
						<h3>Barcelona</h3>
					</article>
					<article>
						<h3>Valencia</h3>
					</article>
					<article>
						<h3>Bilbao</h3>
					</article>
				</div>
			</div>

			<div>
				<div className='flex justify-between items-center'>
					<h2 className='text-2xl font-semibold my-4'>Encuentra un trabajo de...</h2>
					<Link className='underline' href='/buscador-empleos'>+ Filtros</Link>
				</div>
				<div className='flex justify-between'>
					<article>
						<h3>35.000€ O MÁS</h3>
					</article>
					<article>
						<h3>MEDIA JORNADA</h3>
					</article>
					<article>
						<h3>TELETRABAJO</h3>
					</article>
					<article>
						<h3>DIRECTIVO</h3>
					</article>
				</div>
			</div>
		</section>
	)
}
