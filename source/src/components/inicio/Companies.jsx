import Image from 'next/image'
import companies from '@/assets/json/companies.json'

export default function Companies () {
	return (
		<div>
			<h2 className='text-2xl text-center font-semibold my-4'>Empresas</h2>
			<div className='flex gap-4 mx-auto max-w-6xl justify-center flex-wrap'>
				{companies.map((company, index) => (
					<div key={index} className='bg-red-500 rounded-md overflow-hidden flex-grow'>
						<Image src={company.img} alt={company.name} className='w-32 h-32 object-contain' width={200} height={200} />
						<div className='p-2'>
							<h4 className='text-lg'>{company.name}</h4>
							<p>{company.offers} Ofertas</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
