import Link from 'next/link'

export default function NavBar () {
	return (
		<header>
			<nav>
				<ul className='flex gap-2 p-4 justify-center'>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<Link href='/about'>About</Link>
					</li>
					<li>
						<Link href='/contact'>Contact</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
