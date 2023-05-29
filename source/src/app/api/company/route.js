// https://api.infojobs.net/api/8/profile/sdrn:infojobs.net:company_description_plus:adevinta
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const { searchParams } = new URL(request.url)
	const sdrn = searchParams.get('sdrn')
	if (!sdrn) return NextResponse.json({ error: true, message: 'No sdrn provided' }, { status: 400 })

	const company = await axios(`https://api.infojobs.net/api/8/profile/${sdrn}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
		}
	})
		.then(res => res.data)
		.catch(err => err)

	return NextResponse.json(company)
}
