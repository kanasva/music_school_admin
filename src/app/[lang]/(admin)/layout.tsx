import { AdminNav } from "@/components/AdminNav"
import "@/app/globals.css"
import Provider from "@/components/AuthProvider"
import { i18n } from "@/lib/i18n-config"
import SignOutButton from "@/components/SignOutButton"
import { getServerSession } from "next-auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export const metadata = {
  title: "Music School Admin",
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const session = await getServerSession()
  const name = session?.user?.name
  const initials = name
    ?.split(" ")
    .map((word) => word[0].toUpperCase())
    .join("")

  return (
    <Provider>
      <html lang={params.lang}>
        <body className="flex h-auto min-w-[1024px] justify-center">
          <div className="h-auto w-full bg-primary/10"></div>
          <div className="flex h-fit w-screen min-w-[1024px] max-w-screen-2xl flex-none">
            <header className="sticky top-0 h-screen bg-primary/10">
              <h4 className="pb-4 pt-2 text-center">Music School</h4>
              <div className="mb-4 flex flex-col items-center	">
                <Avatar className="mb-2 h-16 w-16">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="text-center">{name}</span>
                <SignOutButton />
              </div>

              <nav>
                <AdminNav lang={params.lang} />
              </nav>
            </header>

            <main className="w-full p-6">{children}</main>
          </div>

          <div className="h-auto w-full"></div>
        </body>
      </html>
    </Provider>
  )
}
