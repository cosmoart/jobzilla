import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const { searchParams } = new URL(request.url)
	const search = searchParams.get('search')
	const sdrn = searchParams.get('sdrn')

	if (!search && !sdrn) return NextResponse.json({ error: true, message: 'No search or sdrn provided' }, { status: 400 })
	const url = sdrn ? `https://api.infojobs.net/api/8/profile/${sdrn}` : 'https://api.infojobs.net/api/1/companies/search'

	const companies = await axios(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		},
		params: {
			q: search
		}
	})
		.then(res => res.data)
		.catch((err) => err)

	return NextResponse.json(companies)
}
