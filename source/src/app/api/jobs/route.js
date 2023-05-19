import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const res = await axios('https://api.infojobs.net/api/9/offer', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		}
	})
		.then(res => res.data)
		.catch(err => err)

	const jobs = res.items.map(job => {
		return {
			id: job.id,
			title: job.title,
			link: job.link,
			location: {
				city: job.city ?? '',
				province: job.province?.value ?? ''
			}
		}
	})

	return NextResponse.json(jobs)
}
