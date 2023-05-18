import JobMap from '@/components/JobMap'
import axios from 'axios'
const FETCH_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://jobzilla.vercel.app'

const fetchJob = async (id) => {
	return await axios(`${FETCH_URL}/api/job?id=${id}`, { cache: 'no-store' })
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
		<main className='flex'>
			<div>
				<h1 className='text-xl font-bold'>{job.title}</h1>
				<p>{job.description}</p>
				<p className='font-bold'>{job.location.city}, {job.location.province}, {job.location.country}</p>
				<a href={job.link} target='_blank' rel='noopener noreferrer' className='px-6 py-3 bg-blue-500 rounded uppercase block text-center'>Aplicar</a>
				<strong>La ubicación en el mapa no es exacta, es un aproximado.</strong>
			</div>
			<div>
				<JobMap job={job} />
			</div>
		</main>
	)
}
