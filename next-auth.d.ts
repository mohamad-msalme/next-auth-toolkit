import { UserRole } from '@prisma/client'
import NextAuth, { DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  id: string
  role: UserRole
  isTwoFactorEnabled: boolean
  password?: string
  provider?: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    name: string
    email: string
    picture: string | null
    sub: string
    iat: number
    exp: number
    role: UserRole
    isTwoFactorEnabled: boolean
    password?: string
    provider?: string
  }
}
