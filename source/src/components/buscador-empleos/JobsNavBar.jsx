import Image from 'next/image'
import gridIcon from '@/assets/icons/grid.svg'
import Pagination from '../ui/pagination'

export default function JobsNavBar ({ data, setFormGrid, currentPage, loading, setCurrentPage }) {
	return (
		<nav className='flex justify-between items-center py-3'>
			<p className='pr-4 font-medium'>
				Ofertas: {data.totalResults?.toLocaleString()}
			</p>

			{
				data.totalPages > 1 && (
					<Pagination
						totalPages={data.totalPages}
						currentPage={currentPage}
						className='mt-1'
						disabled={loading}
						onPageChange={setCurrentPage} />
				)
			}

			<div className='md:flex gap-2  justify-end hidden'>
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
