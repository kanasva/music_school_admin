import { Card } from "@/components/ui/card";
import LocaleSwitcher from "@/components/locale-switcher";
import SignInForm from "./SignInForm";
import { ClientSession } from "@/components/ClientSession";
import SignOutButton from "@/components/SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SignIn() {
  const ServerSession = await getServerSession(authOptions);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <Card className="flex w-full max-w-sm flex-col">
        <h1 className="w-full p-4 text-center">Sign in</h1>
        <SignInForm />
      </Card>

      <div>
        <LocaleSwitcher className="py-4 text-right" />
        <h1>Session</h1>
        <SignOutButton />
        <p>Client Session:</p>
        <ClientSession />
        <p>Server Session:</p>
        <pre>{JSON.stringify(ServerSession, null, 2)}</pre>
      </div>
    </div>
  );
}
