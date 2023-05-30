export default function Informacion () {
	return (
		<div className='py-6 mx-auto max-w-6xl px-6'>
			<h1 className='text-2xl md:text-3xl font-semibold my-3'>Información</h1>
			<div className='flex flex-col gap-3 max-w-4xl'>
				<p>
					¡Bienvenido a mi proyecto! Estoy emocionado de compartir contigo esta nueva plataforma que utiliza la API de Infojobs para mostrar una lista actualizada de trabajos y empresas. El objetivo principal de este proyecto es brindar a los usuarios una forma rápida y sencilla de acceder a oportunidades laborales relevantes y de calidad.
				</p>

				<p>
					Esta web fue hecha para la hackathon de Infojobs y Midudev. El código fuente está disponible en <a className='underline' href='https://github.com/cosmoart/jobzilla' target='_blank' rel='noopener noreferrer'>GitHub</a>. Siéntete libre de revisarlo y contribuir si quieres.
					¡Espero que esta web sea útil para todos los visitantes y ayude a conectar a personas con nuevas y emocionantes oportunidades laborales!
				</p>
			</div>
		</div>
	)
}
