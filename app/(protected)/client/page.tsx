'use client'
import React from 'react'
import { UserInfo } from '@/components/auth/user-info'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const Page: React.FC = () => {
  const user = useCurrentUser()
  return <UserInfo label="🤷‍♂️ Client Component" user={user} />
}

export default Page
