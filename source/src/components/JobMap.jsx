'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import iconLocation from '@/assets/icons/icon-location.svg'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function JobMap ({ location }) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [cords, setCords] = useState([0, 0])

	useEffect(() => {
		setLoading(true)
		axios('https://nominatim.openstreetmap.org/search', {
			params: {
				q: `${location.city}, ${location.province}, ${location.country ?? 'Spain'}}`,
				format: 'json',
				limit: 1,
				'accept-language': 'es'
			},
			timeout: 10000
		})
			.then(res => {
				if (res.data.length > 0) setCords([res.data[0].lat, res.data[0].lon])
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}, [])

	const locationIcon = L.icon({
		iconUrl: iconLocation.src,
		iconSize: [30, 40], // size of the icon
		iconAnchor: [16, 40] // point of the icon which will correspond to marker's location
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
		<MapContainer center={cords} zoom={6} id='map'>
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker position={cords} icon={locationIcon}>
				<Popup>
					{location.city}, {location.province}, {location.country}
				</Popup>
			</Marker>
		</MapContainer>
	)
}
