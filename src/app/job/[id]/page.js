const fetchJob = async (id) => {
	const res = await fetch(`https://api.infojobs.net/api/9/offer/${id}`, {
		headers: {
			contentType: 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		}
	})
	const job = await res.json()
	return job
}

export default async function Job ({ params }) {
	const { id } = params
	const job = await fetchJob(id)

	if (job.error) {
		return <div>Job not found</div>
	}

	return (
		<div>
			<h1>{job.title}</h1>
			<p>{job.profile.description}</p>
		</div>
	)
}
