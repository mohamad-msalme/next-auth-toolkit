import React, { Suspense } from 'react'
import { LoginForm } from './LoginForm'
import { CardWrapper } from '../card-wrapper'

export const LoginPage: React.FC = () => {
  return (
    <CardWrapper
      showSocial
      headerDescription="Welcom back 👋"
      backBtnLabel={'Dont have an account yet?'}
      backBtnHref={'/auth/register'}
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </CardWrapper>
  )
}
