import Image from 'next/image'
import mapLoadingIMG from '@/assets/images/map-loading.webp'
import loaderIcon from '@/assets/icons/loader.svg'
import errorIcon from '@/assets/icons/error.svg'

export default function MapLoadingError ({ loading, error }) {
	return (
		<div className='map rounded-sm overflow-hidden relative'>
			<Image src={mapLoadingIMG} alt='Cargando...' className='blur-[1px] brightness-[.6] h-full object-cover' />
			<div className='absolute top-1/2 left-1/2 transform -trangray-x-1/2 -trangray-y-1/2'>
				{
					loading && (
						<Image src={loaderIcon} alt='Cargando...' width={50} height={50} />
					)
				}
				{
					error && <>
						<Image src={errorIcon} alt='Error' className='invert mx-auto' width={50} height={50} />
						<p className='text-white text-center text-lg'>Ocurrió un error</p>
					</>
				}
			</div>
		</div>
	)
}
