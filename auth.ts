import { db } from './lib/db'
import { JWT } from 'next-auth/jwt'
import NextAuth, { Session } from 'next-auth'

import authConfig from './auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { getUserById } from './data/user'
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: {
          id: user.id
        },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id!)
      if (!existingUser?.emailVerified) return false
      if (existingUser.isTwoFactorEnabled) {
        const twoFActorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        )

        if (!twoFActorConfirmation) return false

        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFActorConfirmation.id
          }
        })
      }
      return true
    },
    jwt: async ({ token, ...rest }) => {
      if (!token.sub) return token
      const user = await getUserById(token.sub)

      if (!user) return token

      token.role = user?.role
      return token
    },
    session: params => {
      const { session, token } = params as { session: Session; token: JWT }

      if (session.user) {
        if (token.sub) session.user.id = token.sub
        if (token.role) session.user.role = token.role
      }

      return session
    }
  },

  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
