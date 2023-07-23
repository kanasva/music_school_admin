import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from '@/lib/i18n-config'
import { NextMiddlewareWithAuth, NextRequestWithAuth, withAuth } from "next-auth/middleware"

function getLocale(request: NextRequest): string | undefined {
	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {}
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

	// @ts-ignore locales are readonly
	const locales: string[] = i18n.locales

	// Use negotiator and intl-localematcher to get best locale
	let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
		locales
	)

	const locale = matchLocale(languages, locales, i18n.defaultLocale)

	return locale
}

function i18nMiddleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	)

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request)

		// e.g. incoming request is /products
		// The new URL is now /en-US/products
		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
				request.url
			)
		)
	}
}

// main middleware
export async function middleware(request: NextRequestWithAuth) {
	const pathname = request.nextUrl.pathname
	console.log(pathname)

	// path /th/sign-in || /en/sign-in can enter directly
	if (pathname === ('/th/sign-in') ||
		pathname === ('/en/sign-in')) {
		console.log("1")
		return
	}

	// path /sign-in only pass i18nMiddleware
	if (pathname === ('/sign-in')) {
		console.log("2")
		return i18nMiddleware(request)
	}

	// other path pass auth
	else {
		console.log("3");
		const invalidPrefixes = ['api', '_next/static', '_next/image', 'favicon.ico'];
		if (!invalidPrefixes.some(prefix => pathname.startsWith(`/${prefix}`))) {
			console.log("4");
			// need to solve the type, look here: https://stackoverflow.com/questions/76702752/chaining-multiple-middlewares-in-next-js, 
			// https://www.youtube.com/watch?v=9bI3ihPg5j0,
			// https://locize.com/blog/next-13-app-dir-i18n/
			return (withAuth(i18nMiddleware) as any)(request);
		}
		else {
			console.log("5");
			return withAuth(request)
		}
	}
}

	// if (
	// 	pathname !== ('/sign-in') &&
	// 	pathname !== ('/th/sign-in') &&
	// 	pathname !== ('/en/sign-in')
	// ) {
	// 	console.log("1")
	// 	return withAuth(request)
	// }
	// if (
	// 	pathname.startsWith('/sign-in')
	// ) {
	// 	console.log("2")
	// 	return i18nMiddleware(request)
	// }
	// if (
	// 	pathname.startsWith('/en/sign-in') ||
	// 	pathname.startsWith('/th/sign-in') ||
	// 	pathname.startsWith('/api') ||
	// 	pathname.startsWith('/_next/static') ||
	// 	pathname.startsWith('/_next/image') ||
	// 	pathname.startsWith('/favicon.ico')
	// ) {
	// 	console.log("3")
	// 	return
	// }
	// console.log("4")

// export const middleware = withAuth(i18nMiddleware)
// export { default } from "next-auth/middleware"

// export const config = {
// 	matcher: [
// 		/*
// 		 * Match all request paths except for the ones starting with:
// 		 * - api (API routes)
// 		 * - _next/static (static files)
// 		 * - _next/image (image optimization files)
// 		 * - favicon.ico (favicon file)
// 		 */
// 		'/((?!api|_next/static|_next/image|favicon.ico).*)',
// 		// '/((?!sign-in).*)',
// 		// sign-in|en/sign-in|th/sign-in|
// 	]
// }