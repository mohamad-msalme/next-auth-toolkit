'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { CardWrapperProps } from '.'

type SocialsProps = Pick<CardWrapperProps, 'showSocial'>
export const Socials: React.FC<SocialsProps> = ({ showSocial }) => {
  if (!showSocial) return null
  return (
    <div className=" flex items-center w-full gap-x-2 ">
      <Button
        size="lg"
        className=" w-full"
        onClick={() => console.log('google')}
        variant="outline"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className=" w-full"
        onClick={() => console.log('hub')}
        variant="outline"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
