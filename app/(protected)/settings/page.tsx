import React from 'react'
import { auth, signOut } from '@/auth'

const Page: React.FC = async () => {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async a => {
          'use server'
          await signOut()
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}

export default Page
