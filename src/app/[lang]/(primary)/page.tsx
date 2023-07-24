import { Locale } from '@/lib/i18n-config'

export default function Home({
	params: { lang },
}: {
	params: { lang: Locale }
}) {
	return (
		<div>
			<h1>Home</h1>
			<p>lang = {lang}</p>
		</div>
	)
}