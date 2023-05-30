import formFilters from '@/assets/json/formFilters.json'
import formCountryFilter from '@/assets/json/formCountryFilter.json'
import { useState } from 'react'

export default function Form ({ showForm }) {
	const [filters, setFilters] = useState({})

	function handleSubmit (e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		const data = Object.fromEntries(formData)
		const queries = Object.entries(data).filter(([key, value]) => value !== '')
		const params = Object.fromEntries(queries)
	}

	return (
		<form
			className={`grid gap-3 mx-auto max-w-6xl px-6 md:px-0 ${showForm ? '' : 'hidden'}`}
			onSubmit={handleSubmit}>
			<fieldset className='flex gap-3 flex-col md:flex-row'>
				<legend className='hidden'>Busca por palabras clave y lugar</legend>
				<input type='text' placeholder='Buscar trabajo...' name='job' required className='py-1 px-2 w-full shrink-[0.4]' />

				<select name='country' defaultValue='espana' id='country' className='w-full p-1 bg-gray-100 rounded-md'>
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

				<select name='category' defaultValue='_' id='category' className='w-full p-1 bg-gray-100 rounded-md' onChange={e => setFilters({ ...filters, category: e.target.value, categoryID: formFilters.category.filter(item => item.value === e.target.value)[0].id })}>
					<option value='_' disabled>Categoría</option>
					{
						formFilters.category.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>

				<select name='subcategory' defaultValue='_' id='subcategory' className='w-full p-1 bg-gray-100 rounded-md'>
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

				<select name='teleworking' defaultValue='_' id='teleworking' className='w-full p-1 bg-gray-100 rounded-md'>
					<option value='_' disabled>Teletrabajo</option>
					{
						formFilters.teleworking.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>

				<select name='contractType' defaultValue='_' id='contractType' className='w-full p-1 bg-gray-100 rounded-md'>
					<option value='_' disabled>Tipo de contrato</option>
					{
						formFilters.contractType.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>

				<select name='workday' defaultValue='_' id='workday' className='w-full p-1 bg-gray-100 rounded-md'>
					<option value='_' disabled>Jornada laboral</option>
					{
						formFilters.workday.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>
			</fieldset>

			{/* <fieldset className='flex gap-3 flex-col md:flex-row'>
				<div className='flex gap-2 flex-grow w-full text-center shrink-[0.7] items-center'>
					<input id='minmax-range' type='range' min='0' max='10' defaultValue='5' className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700' />
					<p className='whitespace-pre'>1000 - 2000</p>
				</div>

				<select name='study' defaultValue='_' id='study' className='w-full p-1 bg-gray-100 rounded-md'>
					<option value='_' disabled>Estudios</option>
					{
						formFilters.study.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>

				<select name='sinceDate' defaultValue='_' id='sinceDate' className='w-full p-1 bg-gray-100 rounded-md'>
					<option value='_' disabled>Fecha</option>
					{
						formFilters.sinceDate.map((item, index) => (
							<option key={index} value={item.key}>{item.value}</option>
						))
					}
				</select>
			</fieldset> */}
		</form>
	)
}
