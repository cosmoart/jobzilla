import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import formFilters from '@/assets/json/formFilters.json'
import formCityFilter from '@/assets/json/formCityFilter.json'
import formRegionFilter from '@/assets/json/formRegionFilter.json'
import { useState } from 'react'

export default function Form ({ setParams, actualParams }) {
	const [salaryMin, setsalaryMin] = useState(7000)
	const searchParams = useSearchParams()
	const pathName = usePathname()
	const { replace } = useRouter()
	let debounceTimer

	const salaryRanges = {
		'bruto-ano': { min: 7000, max: 70000, step: 1000 },
		'bruto-mes': { min: 450, max: 7000, step: 50 },
		'bruto-hora': { min: 5, max: 100, step: 1 }
	}

	function handleSubmit (e) {
		e.preventDefault()
		// setParams(filters)
	}

	function handleSalaryRange (e) {
		setsalaryMin(e.target.value)
		handleInputChangue('salaryMin', e.target.value)
	}

	function handlePeriod (period, salary) {
		const params = new URLSearchParams(searchParams)
		setsalaryMin(salary)
		params.set('salaryMin', salary)
		params.set('salaryPeriod', period)
		replace(`${pathName}?${params.toString()}`, { shallow: true })
	}

	function handleInputChangue (type, value, id) {
		clearTimeout(debounceTimer)
		debounceTimer = setTimeout(() => {
			const params = new URLSearchParams(searchParams)
			if (id) params.set(`${type}ID`, id)
			if (value.trim()) params.set(type, value.trim())
			else params.delete(type)
			replace(`${pathName}?${params.toString()}`, { shallow: true })
		}, 500)
	}

	return (
		<form
			className='grid gap-3 mx-auto max-w-7xl'
			onSubmit={handleSubmit}>
			<fieldset className='flex gap-3 flex-col md:flex-row'>
				<legend className='hidden'>Busca por palabras clave y lugar</legend>
				<input type='text' placeholder='Desarrollador, mesero, diseñador...' name='job'
					defaultValue={actualParams.query ?? ''} className='py-2 bg-gray-100 dark:bg-gray-600 ring-1 ring-gray-200 px-4 w-full rounded-md shrink-[0.4]'
					onChange={(e) => handleInputChangue('query', e.target.value)} />

				<Select name='region'
					onValueChange={(value) => handleInputChangue('region', value.split(' ')[0], value.split(' ')[1])}
					defaultValue={actualParams.region ?? ''} >
					<SelectTrigger className='w-full bg-gray-100 dark:bg-gray-600 text-[15px]' >
						<SelectValue placeholder='Region' className='text-stone-950' />
					</SelectTrigger>
					<SelectContent>
						{
							formRegionFilter.region.map((item, index) => (
								<SelectItem key={index} value={`${item.key} ${item.id}`} className='text-[15px]'>{item.value}</SelectItem>
							))
						}
					</SelectContent>
				</Select>

				<Select name='city'
					onValueChange={(value) => handleInputChangue('city', value)}
					defaultValue={actualParams.city ?? ''} >
					<SelectTrigger className='w-full bg-gray-100 dark:bg-gray-600 text-[15px]' >
						<SelectValue placeholder='Ciudad' className='text-stone-950' />
					</SelectTrigger>
					<SelectContent>
						{
							actualParams.regionID
								? formCityFilter.filter(item => +item.parent === +actualParams.regionID).map((item, index) => (
									<SelectItem key={index} value={item.key} className='text-[15px]'>{item.value}</SelectItem>
								))
								: <SelectItem value='none' disabled>Elija una región</SelectItem>
						}
					</SelectContent>
				</Select>

				<button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-5 w-full'>Buscar</button>
			</fieldset>

			<fieldset className='flex gap-3 flex-col md:flex-row'>
				<Select name='category'
					onValueChange={(value) => handleInputChangue('category', value.split(' ')[0], value.split(' ')[1])}
					defaultValue={actualParams.category ?? ''} >
					<SelectTrigger className='w-full bg-gray-100 dark:bg-gray-600 text-[15px]'>
						<SelectValue placeholder='Categoría' className='text-stone-950' />
					</SelectTrigger>
					<SelectContent>
						{
							formFilters.category.map((item, index) => (
								<SelectItem key={index} value={`${item.key} ${item.id}`} className='text-[15px]'>{item.value}</SelectItem>
							))
						}
					</SelectContent>
				</Select>

				<Select name='subcategory'
					onValueChange={(value) => handleInputChangue('subcategory', value)}
					defaultValue={actualParams.subcategory ?? ''} >
					<SelectTrigger className='w-full bg-gray-100 dark:bg-gray-600 text-[15px]'>
						<SelectValue placeholder='Subcategoría' className='text-stone-950' />
					</SelectTrigger>
					<SelectContent>
						{
							actualParams.categoryID
								? formFilters.subcategory.filter(item => +item.parent === +actualParams.categoryID)
									.map((item, index) => (
										<SelectItem key={index} value={item.key} className='text-[15px]'>{item.value}</SelectItem>
									))
								: <SelectItem value='none' disabled>Elija una categoría</SelectItem>
						}
					</SelectContent>
				</Select>

				<Select name='teleworking'
					onValueChange={(value) => handleInputChangue('teleworking', value)}
					defaultValue={actualParams.teleworking ?? ''} >
					<SelectTrigger className='w-full bg-gray-100 dark:bg-gray-600 text-[15px]'>
						<SelectValue placeholder='Teletrabajo' className='text-stone-950' />
					</SelectTrigger>
					<SelectContent>
						{
							formFilters.teleworking.map((item, index) => (
								<SelectItem key={index} value={item.key} className='text-[15px]'>{item.value}</SelectItem>
							))
						}
					</SelectContent>
				</Select>

				<Select name='contractType'
					onValueChange={(value) => handleInputChangue('contractType', value)}
					defaultValue={actualParams.contractType ?? ''} >
					<SelectTrigger className='w-full bg-gray-100 dark:bg-gray-600 text-[15px]'>
						<SelectValue placeholder='Tipo de contrato' className='text-stone-950 ' />
					</SelectTrigger>
					<SelectContent>
						{
							formFilters.contractType.map((item, index) => (
								<SelectItem key={index} value={item.key} className='text-[15px]'>{item.value}</SelectItem>
							))
						}
					</SelectContent>
				</Select>

				<Select name='workday'
					onValueChange={(value) => handleInputChangue('workday', value)}
					defaultValue={actualParams.workday ?? ''} >
					<SelectTrigger className='w-full bg-gray-100 dark:bg-gray-600 text-[15px]'>
						<SelectValue placeholder='Jornada laboral' className='text-stone-950' />
					</SelectTrigger>
					<SelectContent>
						{
							formFilters.workday.map((item, index) => (
								<SelectItem key={index} value={item.key} className='text-[15px]'>{item.value}</SelectItem>
							))
						}
					</SelectContent>
				</Select>
			</fieldset>

			<fieldset className='flex gap-3 flex-col md:flex-row items-center'>
				<div className='flex gap-2 flex-grow w-full text-center shrink-[0.6] items-center'>
					<input type='range' name='salaryMin'
						defaultValue={actualParams.salaryMin ?? 7000}
						min={salaryRanges[actualParams.salaryPeriod ?? 'bruto-ano'].min}
						max={salaryRanges[actualParams.salaryPeriod ?? 'bruto-ano'].max}
						step={salaryRanges[actualParams.salaryPeriod ?? 'bruto-ano'].step}
						className='w-full'
						onChange={handleSalaryRange} />

					<span className='text-gray-500 dark:text-white mx-2 w-16 block'>{Number(salaryMin).toLocaleString('en-US')}€</span>

					<div className='flex ring-1 rounded-md ring-gray-200'>
						<button type='button' className={`${actualParams.salaryPeriod === 'bruto-hora' ? 'bg-blue-500 text-white hover:bg-blue-600' : ' text-gray-900 hover:bg-gray-200 bg-gray-100 dark:bg-gray-600 dark:text-white'} hover:bg-blue-200 rounded-l-md py-2 px-3`} value='bruto-hora' onClick={() => handlePeriod('bruto-hora', 12)}>
							Hora
						</button>
						<button type='button' className={`${actualParams.salaryPeriod === 'bruto-mes' ? 'bg-blue-500 text-white hover:bg-blue-600' : ' text-gray-900 hover:bg-gray-200 bg-gray-100 dark:bg-gray-600 dark:text-white'} hover:bg-blue-200 py-2 px-3`} value='bruto-mes' onClick={() => handlePeriod('bruto-mes', 450)}>
							Mes
						</button>
						<button type='button' className={`${actualParams.salaryPeriod === 'bruto-ano' || !actualParams.salaryPeriod ? 'bg-blue-500 text-white hover:bg-blue-600' : ' text-gray-900 hover:bg-gray-200 bg-gray-100 dark:bg-gray-600 dark:text-white'} hover:bg-blue-200 rounded-r-md py-2 px-3`} value='bruto-ano' onClick={() => handlePeriod('bruto-ano', 7000)}>
							Año
						</button>
					</div>
				</div>

				<span className='md:h-8 w-full h-[1px] rounded md:w-[1px] bg-gray-400 inline-block my-2  md:mx-2' />

				<Select name='study'
					onValueChange={(value) => handleInputChangue('study', value)}
					defaultValue={actualParams.study ?? ''} >
					<SelectTrigger className='w-full bg-gray-100 dark:bg-gray-600 text-[15px]'>
						<SelectValue placeholder='Estudios' className='text-stone-950' />
					</SelectTrigger>
					<SelectContent>
						{
							formFilters.study.map((item, index) => (
								<SelectItem key={index} value={item.key} className='text-[15px]'>
									{item.value}
								</SelectItem>
							))
						}
					</SelectContent>
				</Select>

				<Select name='sinceDate'
					onValueChange={(value) => handleInputChangue('sinceDate', value)}
					defaultValue={actualParams.sinceDate ?? ''} >
					<SelectTrigger className='w-full bg-gray-100 dark:bg-gray-600 text-[15px]'>
						<SelectValue placeholder='Fecha' className='text-stone-950' />
					</SelectTrigger>
					<SelectContent>
						{
							formFilters.sinceDate.map((item, index) => (
								<SelectItem key={index} value={item.key} className='text-[15px]'>{item.value}</SelectItem>
							))
						}
					</SelectContent>
				</Select>
			</fieldset>
		</form >
	)
}
