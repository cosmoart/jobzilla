import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const url = new URL(request.url)
	const params = Object.fromEntries(new URLSearchParams(url.search))
	const jobs = await axios('https://api.infojobs.net/api/9/offer', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		},
		params: {
			...params,
			order: 'relevancia-desc'
		}
	})
		.then(res => res.data)
		.catch(err => err)

	return NextResponse.json(jobs)
}
