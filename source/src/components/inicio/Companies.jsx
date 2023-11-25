import Image from 'next/image'
import companies from '@/assets/json/companies.json'
import Link from 'next/link'

export default function Companies () {
	return (
		<section className='mx-auto max-w-7xl px-6 lg:px-0'>
			<h2 className='text-2xl text-center font-semibold my-4'>Empresas</h2>
			<div className='responsiveGrid gap-4 justify-center flex-wrap'>
				{
					companies.map((company, index) => (
						<Link href={`/empresa?sdrn=${company.sdrn}`} key={index} className='bg-blue-100 rounded-md flex items-center overflow-hidden flex-grow hover:bg-blue-200 dark:bg-slate-800 data:hover:bg-slate-900 hover:scale-[1.02] transition-all shadow'>
							<Image src={company.logo} alt={company.name + ' logo'} className='w-32 h-full object-cover' width={100} height={100} />
							<div className='py-3 px-5'>
								<h4 className='text-xl my-1 font-semibold'>{company.name}</h4>
								<p className='text-sm'>{company.offers} Ofertas</p>
								<p className='companyShortDescription text-sm mt-1' title={company.description}>{company.description}</p>
							</div>
						</Link>
					))
				}
			</div>
			<Link href='/buscador-empresas' className='text-center block my-4 rounded-md bg-blue-500 px-6 py-2 mx-auto text-white font-semibold w-fit hover:bg-blue-600'>Busca más empresas</Link>
		</section>
	)
}
