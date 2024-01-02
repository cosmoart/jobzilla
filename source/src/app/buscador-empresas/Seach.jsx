import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function Search () {
	const searchParams = useSearchParams()
	const pathName = usePathname()
	const { replace } = useRouter()
	let debounceTimer

	function handleInputChangue (e) {
		clearTimeout(debounceTimer)
		debounceTimer = setTimeout(() => {
			const params = new URLSearchParams(searchParams)
			if (e.target.value.trim()) params.set('query', e.target.value.trim())
			else params.delete('query')
			replace(`${pathName}?${params.toString()}`, { shallow: true })
		}, 500)
	}

	return (
		<input type='search' placeholder='Infojobs, Adevinta, Adidas... ' name='search' className='w-full  sm:w-auto py-2 px-4 dark:text-white  flex-grow dark:bg-gray-800 focus:ring-blue-600 focus:border-transparent z-10' required onChange={handleInputChangue}
			defaultValue={searchParams.get('query')}
		/>
	)
}
