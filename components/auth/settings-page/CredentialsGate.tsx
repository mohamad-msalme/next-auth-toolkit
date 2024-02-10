'use client'
import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export const CredentialsGate: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const user = useCurrentUser()
  return user?.provider === 'credentials' ? <>{children}</> : null
}
