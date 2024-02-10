'use client'
import React from 'react'
import { signOut } from 'next-auth/react'

export const LogoutBtn: React.FC<React.PropsWithChildren> = ({ children }) => {
  const handelClick = () => signOut()
  return (
    <span className=" cursor-pointer" onClick={() => handelClick()}>
      {children}
    </span>
  )
}
