'use client'

import { signIn } from 'next-auth/react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { CardWrapperProps } from '.'
import { DEFFAULT_LOGIN_REDIRECT } from '@/routes'
type SocialsProps = Pick<CardWrapperProps, 'showSocial'>
export const Socials: React.FC<SocialsProps> = ({ showSocial }) => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFFAULT_LOGIN_REDIRECT
    })
  }
  if (!showSocial) return null
  return (
    <div className=" flex items-center w-full gap-x-2 ">
      <Button
        onClick={() => onClick('google')}
        size="lg"
        className=" w-full"
        variant="outline"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => onClick('github')}
        size="lg"
        className=" w-full"
        variant="outline"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
