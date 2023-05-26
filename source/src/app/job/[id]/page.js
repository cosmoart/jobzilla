import axios from 'axios'
import dynamic from 'next/dynamic'
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
	console.log(job)
	return (
		<main className='flex'>
			<div className='flex-grow basis-0 p-3'>
				<h1 className='text-xl font-bold'>{job.title}</h1>
				<p className='whitespace-pre-line'>{job.profile.description}</p>
				<p className='font-bold'>{job.city}, {job.province.value}, {job.country.value}</p>
				<a href={job.link} target='_blank' rel='noopener noreferrer' className='px-6 py-3 bg-blue-500 rounded uppercase block text-center whitespace-pre-line'>Aplicar</a>
				<strong>La ubicación en el mapa no es exacta, es un aproximado.</strong>
			</div>
			<div className='flex-grow basis-0'>
				{/* <JobMap location={job.location} /> */}
			</div>
		</main>
	)
}
