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
		.catch(err => err)

	const location = await axios('https://nominatim.openstreetmap.org/search', {
		params: {
			q: `${job.city}, ${job.province.value}, ${job.country.value}`,
			format: 'json',
			limit: 1
		}
	})
		.then(res => {
			if (res.data.length > 0) return { lat: res.data[0].lat, lon: res.data[0].lon }
		})
		.catch(err => err)

	const jobArray = {
		id: job.id,
		title: job.title,
		description: job.profile.description,
		link: job.link,
		location: {
			lat: location.lat ?? 0,
			lon: location.lon ?? 0,
			city: job.city ?? '',
			province: job.province.value ?? '',
			country: job.country.value ?? ''
		}
	}

	return NextResponse.json(jobArray)
}
