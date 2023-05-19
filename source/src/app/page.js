import Link from 'next/link'
import axios from 'axios'
import dynamic from 'next/dynamic'

const JobsMap = dynamic(() => import('@/components/JobsMap'), { ssr: false })
export const revalidate = 60

const fetchJobs = async () => {
	return await axios(`${process.env.FETCH_URL}/api/jobs`, { cache: 'no-store' })
		.then(res => {
			if (res.data.status >= 400) return { error: true }
			return res.data
		})
		.catch(() => { return { error: true } })
}

export default async function Home () {
	const jobs = await fetchJobs()

	if (jobs.error) {
		return <div>Ha ocurrido un error</div>
	}

	return (
		<main className='min-h-screen items-center justify-between p-3 flex-grow basis-0'>
			<h1 className='text-4xl font-bold'>Jobs</h1>
			<div className='flex'>
				<ul className='flex flex-col gap-2 p-4 flex-grow basis-0 h-[77vh] overflow-auto'>
					{jobs.map((job) => (
						<li key={job.id} className='p-4 rounded-md border hover:bg-gray-300 transition-colors'>
							<Link rel='prefetch' href={`/job/${job.id}`}>
								<h2 className='text-xl font-bold'>{job.title}</h2>
							</Link>
						</li>
					))}
				</ul>
				<JobsMap jobs={jobs} />
			</div>
		</main>
	)
}
