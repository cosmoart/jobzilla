import errorIcon from '@/assets/icons/error.svg'
import Image from 'next/image'

export default function Error () {
	return (
		<div className='map rounded-sm overflow-hidden relative'>
			<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
				<Image src={errorIcon} alt='Error' className='invert mx-auto' width={50} height={50} />
				<p className='text-white text-center text-lg'>Ocurrió un error</p>
			</div>
		</div>
	)
}
