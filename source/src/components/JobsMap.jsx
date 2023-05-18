'use client'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import iconLocation from '@/assets/icons/icon-location.svg'
import L from 'leaflet'

export default function JobsMap () {
	const locationIcon = L.icon({
		iconUrl: iconLocation.src,
		iconSize: [30, 40], // size of the icon
		iconAnchor: [16, 40] // point of the icon which will correspond to marker's location
	})
	const location = [40, -3]

	const markers = [
		{
			lat: 43,
			lon: -3
		},
		{
			lat: 40.6,
			lon: -4
		},
		{
			lat: 42,
			lon: -3.5
		},
		{
			lat: 39,
			lon: -4.3
		}
	]

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
