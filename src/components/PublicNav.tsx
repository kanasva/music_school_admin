"use client"

import Link from "next/link"

export function PublicNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-in">Admin</Link>
        </li>
      </ul>
    </nav>
  )
}
