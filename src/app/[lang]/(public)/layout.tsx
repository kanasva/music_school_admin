import { PublicNav } from "@/components/PublicNav"
import "@/app/globals.css"
import AuthProvider from "@/components/AuthProvider"
import { i18n } from "@/lib/i18n-config"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body>
        <PublicNav />
        {children}
      </body>
    </html>
  )
}
