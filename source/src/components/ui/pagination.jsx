
export default function Pagination ({ currentPage, totalPages, onPageChange, className, disabled }) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
	return (
		<nav>
			<ul className={`flex gap-2 justify-center ${className}`}>
				{pages.map((page) => {
					if (page === 1 || page === totalPages) {
						return (
							<>
								<li key={page}>
									<button className={`hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors ring-1 ring-gray-400/40 bg-gray-200 p-1 aspect-square h-9 rounded-md ${page === currentPage ? '!bg-blue-600 text-white' : ''}`} onClick={() => onPageChange(page)}
										disabled={page === currentPage || disabled}>
										{page}
									</button>
								</li>
							</>
						)
					}

					if (page === currentPage - 3 || page === currentPage + 3) {
						return (
							<li key={page} className=' h-9 flex items-end justify-center'>...</li>
						)
					}

					return <>
						{page > currentPage - 2 && page < currentPage + 2 && (
							<li key={page}>
								<button className={`hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors ring-1 ring-gray-400/40 bg-gray-200 p-1 aspect-square h-9 rounded-md ${page === currentPage ? '!bg-blue-600 text-white' : ''}`} onClick={() => onPageChange(page)}
									disabled={page === currentPage || disabled}>
									{page}
								</button>
							</li>
						)}
					</>
				})}
			</ul>
		</nav>
	)
}
