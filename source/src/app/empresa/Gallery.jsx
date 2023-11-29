import Image from 'next/image'
import mediumZoom from 'medium-zoom'
import { useEffect } from 'react'

export default function Gallery ({ media }) {
	useEffect(() => {
		mediumZoom('[data-zoomable]')
	}, [])

	return (
		<>
			{
				media.filter(media => media.type === 'VIDEO').map((media, i) => (
					<div key={i} className='relative mb-4'>
						<iframe width='100%' height='500px' src={media.url.replace('watch?v=', 'embed/')} title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen></iframe>
					</div>
				))
			}
			<div className='grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4'>
				{
					media.filter(media => media.type === 'IMAGE').map((media, i) => (
						<div key={i} className='relative mb-4'>
							<Image src={media.url} alt={'Imagen ' + i} width={800} height={400} data-zoomable className='rounded w-full h-full object-cover' />
						</div>
					))
				}
			</div>
		</>
	)
}
