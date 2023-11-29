import Image from 'next/image'
import { Rating, ThinStar } from '@smastrom/react-rating'
import { Separator } from '@/components/ui/separator'

export default function Header ({ companyInfo }) {
	return (
		<main className='companyGrid' target='_blank' rel='noopener noreferrer'>
			{
				companyInfo.headerImageUrl && (
					<div className='w-full relative h-[300px] headerHeroIMG -z-10'>
						<Image src={companyInfo.headerImageUrl} alt={companyInfo.name} fill={true} className='rounded-b-md object-cover headerHeroIMG' />
					</div>
				)
			}
			<div className={`flex gap-4 ${!companyInfo.headerImageUrl && 'mt-16'}`}>
				{
					companyInfo.corporativeWebUrl
						? <a href={companyInfo.corporativeWebUrl} target='_blank' rel='noopener noreferrer'>
							<Image className='headerLogo w-28 h-28 -mt-10 ml-5 rounded-md ring-8 ring-white' src={companyInfo.logoUrl ?? '/company-logo.png'} alt={companyInfo.name} width={70} height={70} />
						</a>
						: <Image className='headerLogo w-28 h-28 -mt-10 ml-5 rounded-md ring-8 ring-white' src={companyInfo.logoUrl ?? '/company-logo.png'} alt={companyInfo.name} width={70} height={70} />
				}
				<div className='flex headerDescription justify-center gap-8 items-center py-4 md:px-4'>
					<div className='flex flex-col mb-3'>
						{
							companyInfo.corporativeWebUrl
								? <a href={companyInfo.corporativeWebUrl} target='_blank' rel='noopener noreferrer'>
									<h1 className={`text-2xl font-semibold underline  ${companyInfo.headerImageUrl ? '' : 'inline-block'}`}>
										{companyInfo.name}
									</h1>
								</a>
								: <h1 className={`text-2xl font-semibold ${companyInfo.headerImageUrl ? '' : 'inline-block'}`}>
									{companyInfo.name}
								</h1>
						}
						<span className='font-medium inline-block text-[15px] text-black/90 mr-2 leading-6'>{companyInfo.industry}</span>
					</div>
					<Separator className='hidden md:block' orientation='vertical' />
					<div>
						<div className='flex flex-wrap gap-2'>
							<p className='font-medium inline-block text-[15px] text-black/80'>{companyInfo.province}, {companyInfo.country}</p>
							-
							<p className='font-medium inline-block text-[15px] text-black/80'>{companyInfo.workers.toLocaleString()} empleados</p>
						</div>
						{
							companyInfo.rating && (
								<div className='flex items'>
									<Rating
										value={companyInfo.rating.rating}
										itemStyles={{ itemShapes: ThinStar, activeFillColor: '#f59e0b', inactiveFillColor: '#ffedd5' }}
										readOnly
										className='!w-28'
									/>
									<span className='font-medium inline-block text-[15px] text-black/80 mr-2 leading-6'>{companyInfo.rating.rating.toFixed(1)}</span>
									-
									<p className='font-medium inline-block text-[15px] text-black/80 ml-2 leading-6'>{companyInfo.rating.totalReviews} opiniones</p>
								</div>
							)
						}
					</div>
				</div>
			</div>
		</main>
	)
}
