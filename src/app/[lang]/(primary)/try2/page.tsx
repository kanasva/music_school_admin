export default function try2() {
	return (
		<body className="
			border-2 border-red-500 
			flex flex-row
			w screen h-screen
		">
			<header className="
				border-2 border-red-500
				p-4
			">
				header: logo
				<nav className="
					border-2 border-red-500
					w-max
					pt-4
				">
					<h1>nav</h1>
					<ul className="
						flex flex-col
					">
						<li className="border-2 border-red-500">ภาษาราชการภาษาประจำชาติของประเทศไทย</li>
						<li className="border-2 border-red-500">ภาษาประจำชาติของประเทศไทย</li>
						<li className="border-2 border-red-500">ภาษาไทย</li>
						<li className="border-2 border-red-500">ภาษาในกลุ่มภาษาไท</li>
					</ul>
				</nav>
			</header>

			<main className="
				border-2 border-red-500
				w-full
				p-4
				flex flex-col
				items-center
				justify-center
			">
				main
				<article className="
					border-2 border-red-500
				">
					article
					<section className="border-2 border-red-500">
						breadcrumb
					</section>
					<section className="border-2 border-red-500">
						table
					</section>
				</article>

				<footer className="
					border-2 border-red-500
					mt-auto
				">
					footer
				</footer>
			</main >
		</body >
	)
}