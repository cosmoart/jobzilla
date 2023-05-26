import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const { searchParams } = new URL(request.url)
	const jobs = JSON.parse(searchParams.get('jobs'))
	if (!jobs) return NextResponse.json({ error: true, message: 'No jobs provided' }, { status: 400 })

	const locations = await Promise.all(jobs.map(async (job) => {
		const name = `${job.city}, ${job.province}, Spain`
		const location = await axios(`https://api.maptiler.com/geocoding/${name.replaceAll('/', ' ')}.json`, {
			params: {
				limit: 1,
				key: process.env.MAPTILER_API_KEY
			}
		})
			.then(res => {
				return {
					lon: res.data.features[0].center[0],
					lat: res.data.features[0].center[1]
				}
			})
			.catch(err => {
				if (err.response.status === 404) {
					console.log(`${job.city}, ${job.province}, Spain`)
					return { lon: Math.random() * 2 - 1, lat: Math.random() * 2 - 1 }
				}
				throw err
			})

		return location
	})).then(res => res)
		.catch(err => err)

	return NextResponse.json(locations)
}
