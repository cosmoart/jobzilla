export default function Skeleton () {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto mt-12 mb-20'>
			{
				Array.from(Array(9).keys()).map((i) => (
					<div key={i} className='animate-pulse bg-gray-200 dark:bg-gray-800 p-5 rounded-md overflow-hidden'>
						<section>
							<div className='flex gap-4 items-center'>
								<div className='rounded-md bg-gray-300 w-[80px] h-[80px]' />
								<div>
									<div className='rounded-md bg-gray-300 w-28 h-5 mt-2' />
									<div className='mt-3'>
										<div className='rounded-md bg-gray-300 w-60 h-3' />
										<div className='rounded-md bg-gray-300 w-60 h-3 mt-2' />
										<div className='rounded-md bg-gray-300 w-60 h-3 mt-2' />
										<div className='rounded-md bg-gray-300 w-60 h-3 mt-2' />
									</div>
								</div>
							</div>
						</section>
					</div>
				))
			}
		</div>
	)
}
