export default function Skeleton () {
	return (
		<div className='relative max-w-5xl mx-auto px-6 2xl:px-0 w-full animate-pulse' >
			<div className='bg-gray-300 dark:bg-gray-500 rounded w-full h-[300px]'></div>
			<div className='flex gap-4'>
				<div className=' bg-gray-300 dark:bg-gray-500 rounded w-28 -mt-10 ml-5 h-28 ring-8 dark:ring-gray-400 ring-white '></div>
				<div className='flex gap-3 flex-grow max-w-sm'>
					<div className='w-full mt-4'>
						<div className='h-5 bg-gray-300 dark:bg-gray-500 rounded w-4/5 mt-2'></div>
						<div className='h-5 bg-gray-300 dark:bg-gray-500 rounded w-3/5 mt-2'></div>
					</div>
					<div className='w-full mt-4'>
						<div className='h-5 bg-gray-300 dark:bg-gray-500 rounded w-full mt-2'></div>
						<div className='h-5 bg-gray-300 dark:bg-gray-500 rounded w-4/5 mt-2'></div>
					</div>
				</div>
			</div>
			<div className='bg-gray-300 dark:bg-gray-500 rounded w-full h-96 mt-14'></div>
		</div >
	)
}
