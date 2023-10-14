"use client"

import React, { forwardRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { i18n } from "@/lib/i18n-config"
import { cn } from "@/lib/utils"

const LocaleSwitcher = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/"
    const segments = pathName.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  return (
    <div ref={ref} className={cn("some-default-classes", className)} {...props}>
      <p>
        {i18n.locales
          .map((locale) => (
            <Link href={redirectedPathName(locale)} key={locale}>
              {locale.toUpperCase()}
            </Link>
          ))
          .reduce((prev, curr) => [prev, " | ", curr] as any)}
        &nbsp;(Not Available)
      </p>
    </div>
  )
})

LocaleSwitcher.displayName = "LocaleSwitcher"

export default LocaleSwitcher
