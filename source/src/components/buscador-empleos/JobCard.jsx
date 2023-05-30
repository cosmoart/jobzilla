import Image from 'next/image'
import Link from 'next/link'
import useTimeAgo from '@/hooks/useTimeAgo'

export default function JobCard ({ job }) {
	const timeAgo = useTimeAgo(new Date(job.published))

	return (
		<li key={job.id} className='p-4 rounded-md border hover:bg-blue-200 transition-colors'>
			<Link rel='prefetch' href={`/oferta/${job.id}`} className='flex gap-5 items-center'>
				<Image src={job.author?.logoUrl ?? '/company-logo.png'} alt='' width={50} height={50} className='rounded-full aspect-square' />
				<div>
					<h2 className='text-xl font-bold'>{job.title}</h2>
					<p>Ubicación: {job.city} - {job.province.value}</p>
					<span className='rounded bg-blue-500 p-1 text-white px-2 text-sm'>{timeAgo}</span>
					<span>{job.category.value} - {job.subcategory.value}</span>
					<span>{job.contractType.value}</span>
					<span>{job.salaryMin.value} - {job.salaryMax.value} / {job.salaryPeriod.value}</span>
					<span>{job.experienceMin.value}</span>
					<span>{job.workDay.value}</span>
					<span>{job.study.value}</span>
					{
						job.teleworking && <span>{job.teleworking.value}</span>
					}
					<p className='jobShortDescription'>{job.requirementMin}</p>
				</div>
			</Link>
		</li>
	)
}
