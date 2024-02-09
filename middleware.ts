import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

import {
  DEFFAULT_LOGIN_REDIRECT,
  publicRoute,
  authRoutes,
  apiAuthPrefix
} from '@/routes'
export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoute.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  if (isApiAuthRoute) return null

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl))
  }
  return null
})
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
