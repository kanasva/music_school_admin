import { Locale } from "@/lib/i18n-config"
import { redirect } from "next/navigation"
export default function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  // redicect to the admin/staff page since we haven't the home page yet.
  redirect("/admin/staff")
  return <></>
}
