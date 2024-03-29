import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import iconLocation from '@/assets/icons/icon-location.svg'
import simpleArrowIcon from '@/assets/icons/simple-arrow.svg'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MapLoadingError from './MapLoadingError'
import Image from 'next/image'
import Link from 'next/link'

export default function JobsMap ({ jobs }) {
	const jobsLocations = jobs.map(job => ({
		city: job.city,
		province: job.province.value
	}))

	const [showMap, setShowMap] = useState(true)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [markers, setMarkers] = useState([])

	useEffect(() => {
		setLoading(true)
		axios('/api/locations', {
			params: {
				jobs: JSON.stringify(jobsLocations)
			}
		})
			.then(res => {
				setMarkers(res.data)
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}, [])

	const locationIcon = L.icon({
		iconUrl: iconLocation.src,
		iconSize: [30, 40],
		iconAnchor: [16, 40]
	})

	return (
		<div className='hidden md:block relative min-w-[1rem] '>
			<div className={`h-full ${showMap ? 'w-[30vw]' : 'hidden'}`}>
				{
					loading || error
						? <MapLoadingError loading={loading} error={error} />
						: <MapContainer center={[40, -3]} zoom={5} className='map'>
							<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
							{
								markers.map((marker, i) => (
									<Marker className='cursor-pointer' position={[marker.lat, marker.lon]} icon={locationIcon} key={i} >
										<Popup>
											<span className='block text-xs'>{jobs[i].author.name}</span>
											<Link rel='prefetch' href={`/oferta/${jobs[i].id}`} className='text-base'>{jobs[i].title}</Link>
										</Popup>
										<Tooltip >{jobs[i].title}</Tooltip>
									</Marker>
								))
							}
						</MapContainer>
				}
			</div>
			<button className='bg-white absolute top-1/2 left-0 z-20 -trangray-y-1/2 rounded-r-md hover:bg-gray-100 py-2 px-[2px]' type='button' onClick={() => setShowMap(!showMap)}>
				<Image src={simpleArrowIcon} width={10} height={10} alt='Ocultar' className={` transition-transform ${showMap ? '' : 'rotate-180'}`} />
			</button>
		</div>
	)
}
