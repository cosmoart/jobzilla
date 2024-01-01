'use client'

import { Search as SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Companies from './Companies'
import Search from './Seach'

export default function BuscadorEmpresas ({ searchParams }) {
	const [companies, setCompanies] = useState(null)
	const [error, setError] = useState(false)
	const [loading, setloading] = useState(false)

	function handleSearch (query) {
		setloading(true)
		setError(false)
		axios('/api/companies', {
			params: {
				search: query
			}
		})
			.then(res => setCompanies(res.data.items))
			.catch(() => setError(true))
			.finally(() => setloading(false))
	}

	useEffect(() => {
		if (searchParams.query) handleSearch(searchParams.query)
		else {
			setCompanies(null)
			setError(false)
		}
	}, [searchParams])

	return (
		<main className='max-w-7xl px-6 2xl:px-0 mx-auto min-h-[calc(100vh-64px)] empresas-main mb-24'>
			<h1 className='text-xl md:text-3xl mb-1 pt-12 text-center font-semibold text-white'>Buscador de empresas</h1>
			<p className='text-center text-base md:text-lg mb-6 text-white'>Consulta más de 2 millones de opiniones de más de 9.000 empresas</p>
			<form className='flex flex-row gap-4 items-center justify-center max-w-2xl mx-auto dark:text-gray-900 border bg-white overflow-hidden border-gray-300 rounded-lg focus:outline-none focus:ring-2'>
				<SearchIcon className='ml-5' />
				<Search />
			</form>
			<Companies companies={companies} loading={loading} error={error} search={searchParams.query} />
		</main>
	)
}
