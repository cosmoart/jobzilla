import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const { searchParams } = new URL(request.url)
	const jobs = JSON.parse(searchParams.get('jobs'))
	const timeOut = 3000

	if (!jobs) return NextResponse.json({ error: true, message: 'No jobs provided' }, { status: 400 })

	const locations = await Promise.all(jobs.map(async (job) => {
		const name = `${job.city}, ${job.province || ''}, ${job.country ?? 'Spain'}`.replaceAll('/', ' ')
		const location = await axios(`https://api.maptiler.com/geocoding/${name}.json`, {
			params: {
				limit: 1,
				key: process.env.MAPTILER_API_KEY
			},
			timeout: timeOut
		})
			.then(res => {
				return {
					lon: res.data.features[0].center[0],
					lat: res.data.features[0].center[1]
				}
			})
			.catch(() => {
				return { lon: Math.random() * 2 - 1, lat: Math.random() * 2 - 1 }
			})

		return location
	})).then(res => res)
		.catch(err => err)

	return NextResponse.json(locations)
}
