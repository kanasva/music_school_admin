import "@/app/globals.css"
import Provider from "@/components/AuthProvider"
import { i18n } from "@/lib/i18n-config"

export const metadata = {
  title: "Music School Admin",
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
      <body className="flex h-screen items-center justify-center">
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
