import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET () {
	const jobs = await axios('https://api.infojobs.net/api/9/offer', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		}
	})
		.then(res => res.data)
		.catch(err => err)

	return NextResponse.json(jobs.items)
}
