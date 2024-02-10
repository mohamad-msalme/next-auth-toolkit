import { db } from './lib/db'
import { JWT } from 'next-auth/jwt'
import authConfig from './auth.config'
import { getUserById } from './data/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { Session } from 'next-auth'
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'
import { account } from './data/account'

/* This code exports several variables and functions from the NextAuth configuration. */
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
  /* The `events` property in the NextAuth configuration allows you to define event handlers for
  various authentication events. In this case, the `linkAccount` event handler is defined. */
  events: {
    /* The `linkAccount` event handler is a function that is called when a user links their account
    with another provider (e.g., linking their Google account with their existing email/password
    account). */
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: {
          id: user.id
        },
        data: { emailVerified: new Date() }
      })
    }
  },
  /* The `callbacks` property in the NextAuth configuration allows you to define custom callback
  functions that are called during the authentication process. */
  callbacks: {
    /* The `signIn` callback function is a custom callback function that is called during the
    authentication process when a user signs in. */
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
    /* The `jwt` callback function is used to modify the JSON Web Token (JWT) payload before it is used
    to create a session. */
    jwt: async ({ token, ...rest }) => {
      if (!token.sub) return token
      const user = await getUserById(token.sub)

      if (!user) return token
      const _account = await account(user.id)
      console.log({ _account })
      if (user.name) {
        token.name = user.name
      }
      token.password = user.password || undefined
      token.email = user.email || ''
      token.name = user.name || ''
      token.role = user.role
      token.isTwoFactorEnabled = user.isTwoFactorEnabled
      token.provider = _account?.provider || 'credentials'
      return token
    },
    /* The `session` callback function is used to modify the session object before it is created. */
    session: params => {
      const { session, token } = params as { session: Session; token: JWT }

      if (session.user) {
        if (token.sub) session.user.id = token.sub
        if (token.role) session.user.role = token.role
        session.user.name = token.name
        session.user.email = token.email
        session.user.password = token.password
        session.user.isTwoFactorEnabled = Boolean(token.isTwoFactorEnabled)
        session.user.provider = token.provider
      }
      return session
    }
  },

  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
