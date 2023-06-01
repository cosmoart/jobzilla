'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import iconLocation from '@/assets/icons/icon-location.svg'
import MapLoadingError from './MapLoadingError'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import axios from 'axios'

export default function JobMap ({ job }) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [cords, setCords] = useState([0, 0])

	useEffect(() => {
		setLoading(true)
		axios('/api/location', {
			params: {
				location: `${job.city}, ${job.province.value}, ${job.country.value ?? 'España'}`
			}
		})
			.then(res => setCords(res.data))
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}, [])

	const locationIcon = L.icon({
		iconUrl: iconLocation.src,
		iconSize: [30, 40],
		iconAnchor: [16, 40]
	})

	if (loading || error) {
		return <MapLoadingError loading={loading} error={error} />
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
