'use client'

import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import iconLocation from '@/assets/icons/icon-location.svg'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function JobsMap ({ jobs }) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [markers, setMarkers] = useState([])

	useEffect(() => {
		setLoading(true)
		axios('/api/locations', {
			params: {
				jobs: JSON.stringify(jobs.map(job => job.location))
			}
		})
			.then(res => setMarkers(res.data))
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}, [jobs])

	const locationIcon = L.icon({
		iconUrl: iconLocation.src,
		iconSize: [30, 40],
		iconAnchor: [16, 40]
	})

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
		<MapContainer center={[40, -3]} zoom={6} id='map'>
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			{markers.map((marker, i) => (
				<Marker className='cursor-pointer' position={[marker.lat, marker.lon]} icon={locationIcon} key={i} />
			))}
		</MapContainer>
	)
}
