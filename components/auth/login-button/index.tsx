'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ButtonProps, Button } from '@/components/ui/button'

type LoginBtnProps = ButtonProps & {
  model?: boolean
}
export const LoginBtn: React.FC<React.PropsWithChildren<LoginBtnProps>> = ({
  model,
  ...btnProps
}) => {
  const router = useRouter()

  if (model) {
    return <div>it is dialog</div>
  }
  const handelClick = () => {
    router.push('/auth/login')
  }
  return <Button {...btnProps} onClick={handelClick} />
}
