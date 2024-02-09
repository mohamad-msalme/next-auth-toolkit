import React from 'react'
import { ResetForm } from './ResetForm'
import { CardWrapper } from '../card-wrapper'

export const ResetPage: React.FC = () => {
  return (
    <CardWrapper
      headerDescription="Forget password"
      backBtnLabel={'Back to login'}
      backBtnHref={'/auth/login'}
    >
      <ResetForm />
    </CardWrapper>
  )
}
