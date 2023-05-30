import Image from 'next/image'
import buildingsIcon from '@/assets/icons/buildings.svg'
import briefcaseIcon from '@/assets/icons/briefcase.svg'
import mapIcon from '@/assets/icons/map.svg'

export default function Categories () {
	return (
		<div className='section flex-wrap items-center justify-center gap-8 text-center sm:flex mb-10' data-dark-header='true'>
			<div className='w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800'>
				<div className='flex-shrink-0'>
					<div className='flex items-center justify-center w-12 h-12 mx-auto text-white bg-blue-500 rounded-md'>
						<Image src={buildingsIcon} alt='buildings' className='invert' width={20} height={20} />
					</div>
				</div>
				<h3 className='pt-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white'>
					Empleos
				</h3>
				<p className='py-4 text-gray-500 text-md dark:text-gray-300'>
					Busca entre nuestra lista de trabajos y encuentra el que más se adapte a tus necesidades.
				</p>
			</div>
			<div className='w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24 dark:bg-gray-800'>
				<div className='flex-shrink-0'>
					<div className='flex items-center justify-center w-12 h-12 mx-auto text-white bg-blue-500 rounded-md'>
						<Image src={briefcaseIcon} alt='briefcase' className='invert' width={20} height={20} />
					</div>
				</div>
				<h3 className='pt-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white'>
					Empresas
				</h3>
				<p className='py-4 text-gray-500 text-md dark:text-gray-300'>
					Encuentra y contacta con empresas de todo el mundo para trabajar con ellas.
				</p>
			</div>
			<div className='w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800'>
				<div className='flex-shrink-0'>
					<div className='flex items-center justify-center w-12 h-12 mx-auto text-white bg-blue-500 rounded-md'>
						<Image src={mapIcon} alt='icono de un mapa' className='invert' width={20} height={20} />
					</div>
				</div>
				<h3 className='pt-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white'>
					Mapa
				</h3>
				<p className='py-4 text-gray-500 text-md dark:text-gray-300'>
					Filtra los trabajos por ubicación y encuentra los que estén más cerca de ti.
				</p>
			</div>
		</div>

	)
}
