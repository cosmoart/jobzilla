'use client'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import iconLocation from '@/assets/icons/icon-location.svg'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function JobsMap ({ jobs }) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(true)
	const [markers, setMarkers] = useState(true)

	useEffect(() => {
		Promise.all(jobs.map(async (job) => {
			const location = await axios('https://nominatim.openstreetmap.org/search', {
				params: {
					q: `${job.location.city}, ${job.location.province}, Spain}`,
					format: 'json',
					limit: 1,
					'accept-language': 'es'
				},
				timeout: 10000
			})
				.then(res => {
					console.log(res.data)
					// if (res.data.length > 0) return { lat: res.data[0].lat, lon: res.data[0].lon }
				})
				.catch(() => setError(true))
				.finally(() => setLoading(false))
			return { ...job, location }
		}))
	}, [])

	const locationIcon = L.icon({
		iconUrl: iconLocation.src,
		iconSize: [30, 40], // size of the icon
		iconAnchor: [16, 40] // point of the icon which will correspond to marker's location
	})
	const location = [40, -3]

	if (loading) {
		return (
			<div>Loading...</div>
		)
	}

	if (error) {
		return (
			<div>Error</div>
		)
	}

	return (
		<MapContainer center={location} zoom={6} id='map'>
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker position={location} icon={locationIcon}>
			</Marker>
			{
				markers.map((marker, index) => (
					<Marker key={index} position={[marker.lat, marker.lon]} icon={locationIcon}>
					</Marker>
				))
			}
		</MapContainer>
	)
}
