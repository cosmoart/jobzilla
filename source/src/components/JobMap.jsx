'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import iconLocation from '@/assets/icons/icon-location.svg'
import MapLoadingError from './MapLoadingError'
import { useEffect, useState } from 'react'
import simpleArrowIcon from '@/assets/icons/simple-arrow.svg'
import L from 'leaflet'
import axios from 'axios'
import Image from 'next/image'

export default function JobMap ({ job }) {
	const [showMap, setShowMap] = useState(true)
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

	return (
		<div className='relative min-w-[1rem] w-full h-full'>
			<div className={`h-full ${showMap ? '' : 'hidden'}`}>
				{
					loading || error
						? <MapLoadingError loading={loading} error={error} />
						: <MapContainer center={[cords.lat, cords.lon]} zoom={6} className='map'>
							<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
							<Marker position={[cords.lat, cords.lon]} icon={locationIcon}>
								<Popup>
									{location.city}, {location.province}, {location.country}
								</Popup>
							</Marker>
						</MapContainer>
				}
			</div>
			<strong className={`${showMap ? '' : 'hidden'} absolute bottom-0 z-10 font-semibold text-xs bg-white dark:bg-gray-700 p-1 rounded-tr-md`}>La ubicación en el mapa es un aproximado.</strong>
			<button className='bg-gray-100 absolute top-1/2 left-0 z-20 -trangray-y-1/2 rounded-r-md hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 py-2 px-[2px]' type='button' onClick={() => setShowMap(!showMap)} title={showMap ? 'Ocultar mapa' : 'Mostrar mapa'}>
				<Image src={simpleArrowIcon} width={10} height={10} alt='' className={`dark:invert transition-transform ${showMap ? '' : 'rotate-180'}`} />
			</button>
		</div>
	)
}
