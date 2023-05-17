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
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1 className='text-4xl font-bold'>Jobs</h1>
			<div className='flex flex-col items-center justify-center'>
				{jobs.items && jobs.items.map((job) => (
					<div key={job.id} className='flex flex-col items-center justify-center rounded-lg p-4 m-4'>
						<Link href={`/job/${job.id}`}>
							<h2 className='text-2xl font-bold'>{job.title}</h2>
						</Link>
					</div>
				))}
			</div>
		</main>
	)
}
