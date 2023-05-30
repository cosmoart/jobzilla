import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET (request) {
	const { searchParams } = new URL(request.url)
	const location = searchParams.get('location')
	if (!location) return NextResponse.json({ error: true, message: 'No job provided' }, { status: 400 })

	const coords = await axios(`https://api.maptiler.com/geocoding/${location.replaceAll('/', ' ')}.json`, {
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
				return { lon: Math.random() * 2 - 1, lat: Math.random() * 2 - 1 }
			}
			throw err
		})

	return NextResponse.json(coords)
}
