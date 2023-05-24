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
		axios('/api/location', {
			params: {
				location: `${location.city}, ${location.province}, ${location.country ?? 'Spain'}`
			}
		})
			.then(res => setCords(res.data))
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}, [location])

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
		<MapContainer center={[cords.lat, cords.lon]} zoom={6} id='map'>
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker position={[cords.lat, cords.lon]} icon={locationIcon}>
				<Popup>
					{location.city}, {location.province}, {location.country}
				</Popup>
			</Marker>
		</MapContainer>
	)
}
