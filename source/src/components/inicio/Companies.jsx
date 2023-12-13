import Image from 'next/image'
import companies from '@/assets/json/companies.json'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function Companies () {
	return (
		<section className='mx-auto max-w-7xl px-6 lg:px-0'>
			<h2 className='text-2xl text-center font-semibold my-4'>Empresas</h2>
			<div className='responsiveGrid grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-4 justify-center flex-wrap px-6 2xl:px-0'>
				{
					companies.map((company, index) => (
						<Link href={`/empresa?sdrn=${company.sdrn}`} key={index} className='bg-slate-100 rounded-md flex items-center overflow-hidden flex-grow hover:bg-slate-200 dark:bg-slate-800 data:hover:bg-slate-900 hover:scale-[1.01] transition-all shadow'>
							<Image src={company.logo} alt={company.name + ' logo'} className='w-36 h-full object-cover' width={150} height={100} />
							<div className='py-3 px-5'>
								<div className='flex items-center gap-2'>
									<h4 className='text-lg font-semibold'>{company.name}</h4>
									<Separator orientation='vertical' className='invert dark:invert-0 h-4' />
									<p className='text-sm'>{company.offers} Ofertas</p>
								</div>
								<p className='companyShortDescription text-sm mt-1' title={company.description}>{company.description}</p>
							</div>
						</Link>
					))
				}
			</div>
			<Link href='/buscador-empresas' className='text-center block my-8 rounded-md bg-blue-500 px-7 py-2 mx-auto transition-colors text-white text-lg font-semibold w-fit hover:bg-blue-600'>Buscar más empresas</Link>
		</section>
	)
}
