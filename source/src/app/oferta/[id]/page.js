import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import Error from '@/components/ErrorMessage'
import { ExternalLink } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import axios from 'axios'

const JobMap = dynamic(() => import('@/components/JobMap'), { ssr: false })

const fetchJob = async (id) => {
	return await axios(`${process.env.FETCH_URL}/api/jobs?id=${id}`, { cache: 'no-store' })
		.then(res => {
			if (res.data.status >= 400) return { error: true }
			return res.data
		})
		.catch(() => { return { error: true } })
}

export default async function Job ({ params, className }) {
	const { id } = params
	const job = await fetchJob(id)

	if (job.error) return <Error className='mt-20' />
	return (
		<main className={`flex flex-col md:flex-row max-w-7xl mx-auto ${className}`}>
			<div className='px-4 md:max-w-[80%]'>
				<div className='mb-6'>
					{
						job.profile?.headerImageUrl && (
							<div className='w-full relative h-48'>
								<Image src={job.profile?.headerImageUrl} alt='' fill={true} className='object-cover rounded-b-md' />
							</div>
						)
					}

					<div className='flex flex-col md:flex-row'>
						<Image src={job.profile?.logoUrl ?? '/company-logo.png'} alt='' width={100} height={100} className={`rounded-md mx-auto ring-2 ring-gray-200 aspect-square z-10 size-28 ${job.profile?.headerImageUrl ? '-mt-10' : ''} relative`} />
						<div className='flex items-center justify-between p-3 w-full'>
							<div className='flex flex-col'>
								<h1 className='text-xl font-bold '>{job.title}</h1>
								<strong className='font-semibold text-[15px]'>
									{
										job.profile.web
											? <a href={job.profile.web} target='_blank' rel='noopener noreferrer' >{job.profile.name}</a>
											: job.profile.name
									}
									- {job.city}
								</strong>

							</div>
							<a href={job.link} target='_blank' rel='noopener noreferrer' className='px-6 py-2 bg-blue-500 rounded uppercase  ml-4 hover:bg-blue-600 text-center transition-colors text-white flex items-center gap-2'>
								Aplicar
								<ExternalLink size={18} />
							</a>
						</div>
					</div>
				</div>

				<Table>
					<TableBody className='text-[15px]'>
						<TableRow>
							<TableCell className='border-r-[1px] py-2'><span className='font-semibold'>Aplicaciones:</span> {job.applications}</TableCell>
							<TableCell className='border-r-[1px] py-2'><span className='font-semibold'>Experiencia minima:</span> {job.experienceMin?.value}</TableCell>
							<TableCell className='py-2'><span className='font-semibold'>Categoria:</span> {job.subcategory?.value} - {job.category?.value}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='border-r-[1px] py-2'><span className='font-semibold'>Estudios minimos:</span> {job.studiesMin?.value}</TableCell>
							<TableCell className='border-r-[1px] py-2'><span className='font-semibold'>País:</span> {job.country?.value}</TableCell>
							<TableCell className='py-2'><span className='font-semibold'>Tipo:</span> {job.teleworking?.value}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='border-r-[1px] py-2'><span className='font-semibold'>Salario:</span> {job.salaryDescription}</TableCell>
							<TableCell className='border-r-[1px] py-2'><span className='font-semibold'>Contrato:</span> {job.contractType?.value}</TableCell>
							<TableCell className='py-2'><span className='font-semibold'>Vacantes:</span> {job.vacancies}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='border-r-[1px] py-2'><span className='font-semibold'>Fecha de publicación:</span> {new Date(job.creationDate).toLocaleDateString()}</TableCell>
							<TableCell className='border-r-[1px] py-2'><span className='font-semibold'>Nivel:</span> {job.jobLevel?.value}</TableCell>
							<TableCell className='py-2'><span className='font-semibold'>Duración del contrato:</span> {job.contractDuration}</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<div className='flex-grow basis-0 mt-10'>
					{job.description && (
						<section>
							<h2 className='mb-2 font-semibold text-xl'>Descripción</h2>
							<div className='mb-12 max-w-4xl whitespace-pre-line' dangerouslySetInnerHTML={{ __html: job.description }} />
						</section>
					)}

					{
						job.minRequirements && (<section>
							<h2 className='mb-2 font-semibold text-xl'>Requisitos</h2>
							<div className='mb-12 max-w-4xl whitespace-pre-line' dangerouslySetInnerHTML={{ __html: job.minRequirements }} />
						</section>)
					}
				</div>
			</div>

			<div className='flex-grow mb-20 md:mb-0 md:basis-0 flex md:h-[90vh] w-full h-96 md:sticky top-16'>
				<JobMap job={job} />
			</div>
		</main>
	)
}
