import axios from 'axios'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const JobMap = dynamic(() => import('@/components/JobMap'), { ssr: false })

const fetchJob = async (id) => {
	return await axios(`${process.env.FETCH_URL}/api/job?id=${id}`, { cache: 'no-store' })
		.then(res => {
			if (res.data.status >= 400) return { error: true }
			return res.data
		})
		.catch(() => { return { error: true } })
}

export default async function Job ({ params }) {
	const { id } = params
	const job = await fetchJob(id)

	if (job.error) {
		return <div>Ha ocurrido un error</div>
	}

	return (
		<main className='flex mt-8'>
			<div className='max-w-5xl px-3'>
				<div>
					<div className='w-full relative h-48'>
						<Image src={job.profile?.headerImageUrl ?? '/'} alt='' fill={true} className='object-cover aspect-square relative' />
					</div>
					<Image src={job.profile?.logoUrl ?? '/company-logo.png'} alt='' width={50} height={50} className='rounded-full aspect-square' />
					<strong>{job.profile.name}</strong>
				</div>
				<div className='flex-grow basis-0'>
					<h1 className='text-xl font-bold my-4'>{job.title}</h1>
					<p className='whitespace-pre-line'>{job.profile.description}</p>
					<span>
						Experiencia minima: {job.experienceMin.value}
					</span>
					<span>
						Categoria: {job.subcategory.value} - {job.category.value}
					</span>
					<p className='font-bold'>{job.city}, {job.province.value}, {job.country.value}</p>
					<a href={job.link} target='_blank' rel='noopener noreferrer' className='px-6 py-3 bg-blue-500 rounded uppercase block text-center text-white'>Aplicar</a>
					<strong>La ubicación en el mapa no es exacta, es un aproximado.</strong>
				</div>
			</div>
			<div className='flex-grow basis-0'>
				{/* <JobMap job={job} /> */}
			</div>
		</main>
	)
}
