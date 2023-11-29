import Image from 'next/image'
import Link from 'next/link'
import Skeleton from './Skeleton'
import ErrorMessage from '@/components/ErrorMessage'

export default function Companies ({ companies, loading, error }) {
	const errorText = error ? 'Ha ocurrido un error' : companies?.length < 1 && companies !== null ? 'No se han encontrado resultados' : ''

	if (loading) return <Skeleton />
	if (errorText) return <ErrorMessage message={errorText} className='!mt-28' />
	if (!companies || companies?.length < 1) return <></>

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto  mt-12 mb-20'>
			{
				companies.map((company, i) => (
					<Link key={i} href={`/empresa?sdrn=${company.sdrn}`} className='bg-slate-200 p-5 rounded-md overflow-hidden hover:scale-[1.02] transition-all'>
						<section className='h-full'>
							<div className='flex gap-4 items-center h-full'>
								<Image className='rounded-md'
									src={company.logo?.includes('null') ? '/company-logo.png' : company.logo}
									width={80} height={80}
									alt={`${company.name} logo`} />
								<div>
									<h3 className='text-lg font-medium'>{company.name}</h3>
									<p className='companyShortDescription text-sm mt-2 max-h-60' title={company.description}>{company.description}</p>
								</div>
							</div>
						</section>
					</Link>
				))
			}
		</div>
	)
}
