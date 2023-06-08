import formFilters from '@/assets/json/formFilters.json'
import formCountryFilter from '@/assets/json/formCountryFilter.json'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Form ({ setParams }) {
	const validQueries = ['q', 'province', 'category', 'subcategory', 'city', 'country', 'salaryMin', 'salaryPeriod', 'study', 'contractType', 'experienceMin', 'workday', 'order', 'page', 'sinceDate', 'teleworking']

	const salaryRanges = {
		'bruto-ano': { min: 7000, max: 70000, step: 1000 },
		'bruto-mes': { min: 450, max: 7000, step: 50 },
		'bruto-hora': { min: 12, max: 100, step: 1 }
	}

	const [filters, setFilters] = useState({
		salaryPeriod: 'bruto-ano',
		salaryMin: 7000
	})
	const searchP = useSearchParams()

	useEffect(() => {
		const searchParams = Object.fromEntries(searchP)
		const filtered = Object.keys(searchParams)
			.filter(key => validQueries.includes(key))
			.reduce((obj, key) => {
				obj[key] = searchParams[key]
				return obj
			}, {})
		setFilters(filters => ({ ...filters, ...filtered }))
	}, [])

	function handleSubmit (e) {
		e.preventDefault()
		console.log(filters)
		setParams(filters)
	}

	function handlePeriod (e) {
		if (e.target.value === 'bruto-ano') setFilters({ ...filters, salaryMin: 7000 })
		else if (e.target.value === 'bruto-mes') setFilters({ ...filters, salaryMin: 450 })
		else if (e.target.value === 'bruto-hora') setFilters({ ...filters, salaryMin: 12 })
		setFilters(filters => ({ ...filters, salaryPeriod: e.target.value }))
	}

	return (
		<form
			className='grid gap-3 px-6 md:px-0 mx-auto max-w-6xl'
			onSubmit={handleSubmit}>
			<fieldset className='flex gap-3 flex-col md:flex-row'>
				<legend className='hidden'>Busca por palabras clave y lugar</legend>
				<input type='text' placeholder='Desarrollador, mesero, diseñador...' name='job' defaultValue={filters.q ?? ''} className='py-2 bg-slate-100 dark:bg-slate-600 px-4 w-full rounded-md shrink-[0.4]' onChange={e => setFilters({ ...filters, q: e.target.value })} />

				<select name='country' defaultValue={filters.country ?? 'espana'} id='country' className='w-full py-2 px-3 bg-slate-100 dark:bg-slate-600 rounded-md' onChange={e => setFilters({ ...filters, country: e.target.value })}>
					<option value='_' disabled>País</option>
					{
						formCountryFilter.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>

				<button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-6'>Buscar</button>
			</fieldset>

			<fieldset className='flex gap-3 flex-col md:flex-row'>

				<select name='category' defaultValue={filters.category ?? '_'} id='category' className='w-full py-2 px-3 bg-slate-100 dark:bg-slate-600 rounded-md' onChange={e => setFilters({ ...filters, category: e.target.value })}>
					<option value='_' disabled>Categoría</option>
					{
						formFilters.category.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>

				<select name='subcategory' defaultValue={filters.subcategory ?? '_'} id='subcategory' className='w-full py-2 px-3 bg-slate-100 dark:bg-slate-600 rounded-md' onChange={e => setFilters({ ...filters, subcategory: e.target.value })}>
					<option value='_' disabled >Subcategoría</option>
					{
						filters.category
							? formFilters.subcategory.filter(item => item.parent === filters.categoryID)
								.map((item, index) => (
									<option key={index} value={item.key}>{item.value}</option>
								))
							: <option value='' disabled>Elija una categoría</option>
					}
				</select>

				<select name='teleworking' defaultValue={filters.teleworking ?? '_'} id='teleworking' className='w-full py-2 px-3 bg-slate-100 dark:bg-slate-600 rounded-md' onChange={e => setFilters({ ...filters, teleworking: e.target.value })}>
					<option value='_' disabled>Teletrabajo</option>
					{
						formFilters.teleworking.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>

				<select name='contractType' defaultValue={filters.contractType ?? '_'} id='contractType' className='w-full py-2 px-3 bg-slate-100 dark:bg-slate-600 rounded-md' onChange={e => setFilters({ ...filters, contractType: e.target.value })}>
					<option value='_' disabled>Tipo de contrato</option>
					{
						formFilters.contractType.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>

				<select name='workday' defaultValue='_' id='workday' className='w-full p-1 bg-slate-100 dark:bg-slate-600 rounded-md' onChange={e => setFilters({ ...filters, workday: e.target.value })}>
					<option value='_' disabled>Jornada laboral</option>
					{
						formFilters.workday.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>
			</fieldset>

			<fieldset className='flex gap-3 flex-col md:flex-row items-center'>
				<div className='flex gap-2 flex-grow w-full text-center shrink-[0.6] items-center'>
					<input type='range' name='salaryMin'
						defaultValue={filters.salaryMin ?? 0}
						min={salaryRanges[filters.salaryPeriod].min}
						max={salaryRanges[filters.salaryPeriod].max}
						step={salaryRanges[filters.salaryPeriod].step}
						className='w-full'
						onChange={e => setFilters({ ...filters, salaryMin: e.target.value })} />

					<span className='text-slate-500 dark:text-white mx-2'>{Number(filters.salaryMin).toLocaleString('en-US')}€</span>

					<div className='flex'>
						<button type='button' className={`${filters.salaryPeriod === 'bruto-hora' ? 'bg-blue-500 text-white hover:bg-blue-600' : ' text-slate-900 hover:bg-slate-200 bg-slate-100 dark:bg-slate-600 dark:text-white'} hover:bg-blue-200 rounded-l-md py-2 px-3`} value='bruto-hora' onClick={handlePeriod}>
							Hora
						</button>
						<button type='button' className={`${filters.salaryPeriod === 'bruto-mes' ? 'bg-blue-500 text-white hover:bg-blue-600' : ' text-slate-900 hover:bg-slate-200 bg-slate-100 dark:bg-slate-600 dark:text-white'} hover:bg-blue-200 py-2 px-3`} value='bruto-mes' onClick={handlePeriod}>
							Mes
						</button>
						<button type='button' className={`${filters.salaryPeriod === 'bruto-ano' ? 'bg-blue-500 text-white hover:bg-blue-600' : ' text-slate-900 hover:bg-slate-200 bg-slate-100 dark:bg-slate-600 dark:text-white'} hover:bg-blue-200 rounded-r-md py-2 px-3`} value='bruto-ano' onClick={handlePeriod}>
							Año
						</button>
					</div>
				</div>

				<span className='h-8 rounded w-[1px] bg-slate-400 inline-block mx-2' />

				<select name='study' defaultValue='_' id='study' className='w-full py-2 px-3 bg-slate-100 dark:bg-slate-600 rounded-md' onChange={e => setFilters({ ...filters, study: e.target.value })}>
					<option value='_' disabled>Estudios</option>
					{
						formFilters.study.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>

				<select name='sinceDate' defaultValue='_' id='sinceDate' className='w-full py-2 px-3 bg-slate-100 dark:bg-slate-600 rounded-md' onChange={e => setFilters({ ...filters, sinceDate: e.target.value })}>
					<option value='_' disabled>Fecha</option>
					{
						formFilters.sinceDate.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>
			</fieldset>
		</form>
	)
}
