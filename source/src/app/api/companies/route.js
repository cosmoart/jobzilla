import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const { searchParams } = new URL(request.url)
	const search = searchParams.get('search')
	if (!search) return NextResponse.json({ error: true, message: 'No search provided' }, { status: 400 })

	const companies = await axios('https://api.infojobs.net/api/1/companies/search', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		},
		params: {
			q: search
		}
	})
		.then(res => res.data)
		.catch(err => err)

	return NextResponse.json(companies)
}
