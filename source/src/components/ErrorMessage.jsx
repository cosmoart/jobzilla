import sadIcon from '@/assets/icons/sad.svg'
import Image from 'next/image'

export default function ErrorMessage ({ message = 'Ocurrió un error' }) {
	return (
		<div className='grid place-items-center mt-8 content-center'>
			<Image src={sadIcon} alt='Error' className='dark:invert mx-auto mb-2' width={50} height={50} />
			<p className='dark:text-white text-center text-lg'>
				{message}
			</p>
		</div>
	)
}
