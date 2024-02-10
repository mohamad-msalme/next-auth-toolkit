import React from 'react'
import { currentUser } from '@/lib/currentUser'
import { UserInfo } from '@/components/auth/user-info'

const Page: React.FC = async () => {
  const user = await currentUser()
  return <UserInfo label="💻 Server Component" user={user} />
}

export default Page
