import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	if (!id) return NextResponse.json({ error: true, message: 'No id provided' }, { status: 400 })

	const job = await axios(`https://api.infojobs.net/api/9/offer/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		}
	})
		.then(res => res.data)
		.catch(err => { return { error: true, message: err } })

	const jobArray = {
		id: job.id,
		title: job.title,
		description: job.profile.description,
		link: job.link,
		location: {
			city: job.city ?? '',
			province: job.province.value ?? '',
			country: job.country.value ?? ''
		}
	}

	return NextResponse.json(jobArray)
}
