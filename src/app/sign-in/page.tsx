"use client"

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession().data

  return (
    <>
      <div>
        <h1>Sign in</h1>
        <button onClick={() => signIn()}>
          Sign in
        </button>
        <button onClick={() => signOut()}>
          Sign out
        </button>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <h1>Sign up</h1>
    </>
  )
}
