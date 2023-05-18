'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import iconLocation from '@/assets/icons/icon-location.svg'
import L from 'leaflet'

export default function JobMap ({ job }) {
	const locationIcon = L.icon({
		iconUrl: iconLocation.src,
		iconSize: [30, 40], // size of the icon
		iconAnchor: [16, 40] // point of the icon which will correspond to marker's location
	})
	const location = [job.location.lat || 0, job.location.lon || 0]

	return (
		<MapContainer center={location} zoom={6} id='map'>
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker position={location} icon={locationIcon}>
				<Popup>
					{job.location.city}, {job.location.province}, {job.location.country}
				</Popup>
			</Marker>
		</MapContainer>
	)
}
