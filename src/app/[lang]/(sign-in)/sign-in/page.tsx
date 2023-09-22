import { Card } from "@/components/ui/card"
import LocaleSwitcher from "@/components/locale-switcher"
import SignInForm from "./SignInForm"
import { ClientSession } from "@/components/ClientSession"
import SignOutButton from "@/components/SignOutButton"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function SignIn() {
  const ServerSession = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full h-full justify-center items-center p-4">
      <Card className="flex flex-col w-full max-w-sm">
        <h1 className="p-4 w-full text-center">Sign in</h1>
        <SignInForm />
      </Card>

      <div>
        <h1>Locale</h1>
        <LocaleSwitcher />
        <h1>Session</h1>
        <SignOutButton />
        <p>Client Session:</p>
        <ClientSession />
        <p>Server Session:</p>
        <pre>{JSON.stringify(ServerSession, null, 2)}</pre>
      </div>
    </div>
  )
}
