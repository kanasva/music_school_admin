"use client"

// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { i18n } from "@/lib/i18n-config"

// export default function LocaleSwitcher() {
//   const pathName = usePathname()
//   const redirectedPathName = (locale: string) => {
//     if (!pathName) return "/"
//     const segments = pathName.split("/")
//     segments[1] = locale
//     return segments.join("/")
//   }

//   return (
//     <div>
//       <p>
//         Locale switcher:{" "}
//         {i18n.locales.map((locale) => {
//           return <Link href={redirectedPathName(locale)}>{locale} </Link>
//         })}
//       </p>
//     </div>
//   )
// }

import React, { forwardRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { i18n } from "@/lib/i18n-config"
import cn from "classnames" // Assuming you're using 'classnames' package

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
        Locale switcher:{" "}
        {i18n.locales.map((locale) => {
          return (
            <Link href={redirectedPathName(locale)} key={locale}>
              {locale}{" "}
            </Link>
          )
        })}
      </p>
    </div>
  )
})

LocaleSwitcher.displayName = "LocaleSwitcher"

export default LocaleSwitcher
