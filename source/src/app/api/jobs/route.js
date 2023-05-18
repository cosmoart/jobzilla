import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const job = await axios('https://api.infojobs.net/api/9/offer', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		}
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => err)

	return NextResponse.json(job)
}
