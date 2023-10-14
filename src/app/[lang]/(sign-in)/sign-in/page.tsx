import { Card } from "@/components/ui/card"
import LocaleSwitcher from "@/components/locale-switcher"
import SignInForm from "./SignInForm"

export default async function SignIn() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <Card className="flex w-full max-w-sm flex-col">
        <h1 className="w-full p-4 text-center">Sign in</h1>
        <SignInForm />
      </Card>
      <LocaleSwitcher className="py-4 text-right" />
    </div>
  )
}
