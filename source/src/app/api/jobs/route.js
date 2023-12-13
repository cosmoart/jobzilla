import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')
	const params = Object.fromEntries(new URLSearchParams(searchParams.toString()))

	if (!id && !params) return NextResponse.json({ error: true, message: 'No id or params provided' }, { status: 400 })
	// const url = id ? `https://api.infojobs.net/api/9/offer/${id}` : 'https://api.infojobs.net/api/9/offer'
	const url = 'https://api.infojobs.net/api/1/dictionary/city'

	const job = await axios(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		},
		params: {
			...params
		}
	})
		.then(res => res.data)
		.catch(err => { return { error: true, message: err } })

	return NextResponse.json(job)
}
