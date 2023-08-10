import Error from '@/components/ErrorMessage'
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
		return <Error />
	}

	return (
		<main className='flex max-w-7xl mx-auto'>
			<div className='max-w-6xl px-4'>
				<div className='headerGrid'>
					{
						job.profile?.headerImageUrl && (
							<div className='w-full relative h-48 headerHeroIMG'>
								<Image src={job.profile?.headerImageUrl} alt='' fill={true} className='object-cover' />
							</div>
						)
					}
					<Image src={job.profile?.logoUrl ?? '/company-logo.png'} alt='' width={100} height={100} className='headerLogo w-full rounded-md ring-2 ring-slate-200 aspect-square z-10' />
					<div className='flex items-center justify-between headerDescription p-3'>
						<div className='flex flex-col'>
							<strong className='font-semibold'>{job.profile.name}</strong>
							<h1 className='text-xl font-bold my-1'>{job.title}</h1>
						</div>
						<a href={job.link} target='_blank' rel='noopener noreferrer' className='px-6 py-2 bg-blue-500 rounded uppercase block ml-4 hover:bg-blue-600 text-center text-white'>Aplicar</a>

					</div>
				</div>
				<div className='flex-grow basis-0'>
					<span>
						Experiencia minima: {job.experienceMin.value}
					</span>
					<span>
						Categoria: {job.subcategory.value} - {job.category.value}
					</span>
					<p className='font-bold'>{job.city}, {job.province.value}, {job.country.value}</p>
					<div className='mb-24 max-w-4xl whitespace-pre-line' dangerouslySetInnerHTML={{ __html: job.profile.description }} />
				</div>
			</div>
			<div className='flex-grow basis-0 flex h-[90vh]'>
				<JobMap job={job} />
			</div>
		</main>
	)
}
