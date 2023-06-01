import Image from 'next/image'
import companies from '@/assets/json/companies.json'

export default function Companies () {
	return (
		<section>
			<h2 className='text-2xl text-center font-semibold my-4'>Empresas</h2>
			<div className='responsiveGrid gap-4 mx-auto max-w-6xl justify-center flex-wrap'>
				{companies.map((company, index) => (
					<div key={index} className='bg-blue-100 rounded-md flex items-center overflow-hidden flex-grow'>
						<Image src={company.img} alt={company.name} className='w-32 h-32 object-contain' width={200} height={200} />
						<div className='py-2 px-4'>
							<h4 className='text-lg font-semibold'>{company.name}</h4>
							<p>{company.offers} Ofertas</p>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
