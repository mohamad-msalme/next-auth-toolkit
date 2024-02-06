import React from 'react'
import { auth } from '@/auth'

const Page: React.FC = async () => {
  const session = await auth()
  return <div>{JSON.stringify(session)}</div>
}

export default Page
