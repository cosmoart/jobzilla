import Image from 'next/image'
import Link from 'next/link'
import useTimeAgo from '@/hooks/useTimeAgo'

export default function JobCard ({ job }) {
	const { shortTimeAgo, longTimeAgo, newTime } = useTimeAgo(new Date(job.published))

	return (
		<li key={job.id} className='p-4 rounded-md border dark:border-gray-500 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors overflow-hidden h-max min-h-full'>
			<Link rel='prefetch' href={`/oferta/${job.id}`} className='flex gap-5 items-center'>
				<Image src={job.author?.logoUrl ?? '/company-logo.png'} alt={job.name + ' logo'} width={60} height={60} className='hidden md:block rounded-md aspect-square mb-auto ring-2 ring-gray-200' />
				<div>
					<div className='flex gap-3 items-center'>
						<h2 className='text-xl font-bold'>{job.title}</h2>
						<span className={`rounded p-1 whitespace-pre px-3 text-xs font-semibold ${newTime ? 'bg-blue-500 text-white' : 'ring-2'}`} title={longTimeAgo}>{shortTimeAgo}</span>
					</div>
					<p className='text-sm'>{job.city} - {job.province.value}</p>
					<div className='flex gap-3 items-center'>
						{
							job.salaryMin.value && (
								<>
									<strong className='text-sm font-semibold text-green-600'>{job.salaryMin.value} - {job.salaryMax.value} / {job.salaryPeriod.value}</strong>
									<span className='h-3 rounded w-[1px] bg-gray-800 inline-block' />
								</>
							)
						}
						{
							job.teleworking && <span className='text-sm'>{job.teleworking.value}</span>
						}
					</div>

					<p className='jobShortDescription my-2' title={job.requirementMin}>{job.requirementMin}</p>
				</div>
			</Link>
		</li>
	)
}
