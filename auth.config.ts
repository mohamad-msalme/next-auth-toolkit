import Credentials from 'next-auth/providers/credentials'
import { compare } from './lib/cryptPassword'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'
import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const validateCredentials = LoginSchema.safeParse(credentials)

        if (!validateCredentials.success) return null
        console.log({ authorize: credentials })

        const { email, password } = credentials
        const user = await getUserByEmail(email as string)

        if (!user || !user?.password) return null

        const matchPassword = await compare(password as string, user.password)

        if (matchPassword) return user
        return null
      }
    })
  ]
} satisfies NextAuthConfig
