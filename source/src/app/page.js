import JobsMap from '@/components/JobsMap'
import Link from 'next/link'

const fetchJobs = async () => {
	const res = await fetch('https://api.infojobs.net/api/9/offer', {
		headers: {
			contentType: 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		}
	})
	const jobs = await res.json()
	return jobs
}

export default async function Home () {
	const jobs = await fetchJobs()

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-3'>
			<h1 className='text-4xl font-bold'>Jobs</h1>
			<div className='flex'>
				<ul className='flex flex-col gap-2 p-4'>
					{jobs.items && jobs.items.map((job) => (
						<li key={job.id} className='p-4 rounded-md border hover:bg-gray-300 transition-colors'>
							<Link href={`/job/${job.id}`}>
								<h2 className='text-2xl font-bold'>{job.title}</h2>
							</Link>
						</li>
					))}
				</ul>
				<JobsMap />
			</div>
		</main>
	)
}
