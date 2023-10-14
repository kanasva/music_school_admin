import { NextResponse } from "next/server"
import type { NextFetchEvent, NextRequest } from "next/server"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { i18n } from "@/lib/i18n-config"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  )
  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

function i18nMiddleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}${search}`,
        request.url,
      ),
    )
  }
}

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const pathname = req.nextUrl.pathname
  // match any paths that start with /_next, /api/auth, and exactly /favicon.ico
  const internalPath = new RegExp(`^(/_next|/api/auth).*|^(/favicon.ico)$`)
  const locales = i18n.locales.join("|")
  // publicPath is /, /sign-in, /en, /th, /en/sign-in, /th/sign-in
  const publicPath = new RegExp(
    `^(/|/sign-in|/(${locales})|/(${locales})/sign-in)$`,
  )

  // allow internal path
  if (internalPath.test(pathname)) {
    return NextResponse.next()
  }

  // allow public path
  if (publicPath.test(pathname)) {
    return i18nMiddleware(req)
  }

  // to Auth
  else {
    return withAuth(
      // `withAuth` augments your `Request` with the user's token.
      function middleware(req) {
        const rolePathWithLocale = (path: string) =>
          new RegExp(`^/(${locales})${path}`)

        if (req.nextauth.token?.role === "ADMIN") {
          if (pathname.startsWith("/api/admin")) {
            return NextResponse.next()
          }
          if (
            pathname.startsWith("/admin") ||
            rolePathWithLocale("/admin").test(pathname) ||
            pathname.startsWith("/api/admin")
          ) {
            return i18nMiddleware(req)
          } else {
            return NextResponse.redirect(
              new URL(`/${getLocale(req)}/admin/staff`, req.url),
            )
          }
        }
        if (req.nextauth.token?.role === "STUDENT") {
          if (
            pathname.startsWith("/student") ||
            rolePathWithLocale("/student").test(pathname) ||
            pathname.startsWith("/api/student")
          ) {
            return i18nMiddleware(req)
          } else {
            return NextResponse.redirect(
              new URL(`/${getLocale(req)}/student`, req.url),
            )
          }
        }
        return new NextResponse(
          JSON.stringify({ success: false, message: "authentication failed" }),
          { status: 401, headers: { "content-type": "application/json" } },
        )
      },
      {
        callbacks: {
          authorized: ({ token }) => {
            return !!token
          },
        },
        pages: {
          signIn: getLocale(req) + "/sign-in",
        },
      },
      // withAuth only need to take req, but here to conform withAuth type
    )(req as NextRequestWithAuth, event)
  }
}
