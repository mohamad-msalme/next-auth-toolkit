import React from 'react'
import { auth } from '@/auth'
import { SessionProvider as NextSessionProvider } from 'next-auth/react'

export const SessionProvider: React.FC<React.PropsWithChildren> = async ({
  children
}) => {
  const session = await auth()
  return <NextSessionProvider session={session}>{children}</NextSessionProvider>
}
