"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

type ProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
