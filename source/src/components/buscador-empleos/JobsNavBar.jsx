import Image from 'next/image'
import gridIcon from '@/assets/icons/grid.svg'

export default function JobsNavBar ({ data, setFormGrid }) {
	return (
		<nav className='flex justify-between items-center py-3'>
			<p className='px-4 font-medium'>
				Ofertas: {data.totalResults?.toLocaleString()}
			</p>

			<div className='flex gap-2 flex-grow justify-end'>
				<button className='rounded text-white p-1 bg-blue-500 hover:bg-blue-600' onClick={() => setFormGrid(1)}>
					<Image src={gridIcon} alt='grid-row' width={20} height={20} />
				</button>
				<button className='rounded text-white p-1 bg-blue-500 hover:bg-blue-600' onClick={() => setFormGrid(2)}>
					<Image src={gridIcon} alt='grid-col' className='rotate-90' width={20} height={20} />
				</button>
			</div>
		</nav>
	)
}
