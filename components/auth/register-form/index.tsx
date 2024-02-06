import React from 'react'
import { CardWrapper } from '../card-wrapper'
import { RegisterForm } from './RegisterForm'

export const RegisterPage: React.FC = () => {
  return (
    <CardWrapper
      showSocial
      headerDescription="Create an account"
      backBtnLabel={'Already have an account?'}
      backBtnHref={'/auth/login'}
    >
      <RegisterForm />
    </CardWrapper>
  )
}
