import React from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { NewPasswordForm } from '@/components/auth/new-password'
import { verifyResetPasswordToken } from '@/actions/resetPassword.action'

type TPage = {
  searchParams: {
    token?: string
  }
  params: Record<string, string>
}
const Page: React.FC<TPage> = async ({ searchParams }) => {
  let validToken = false
  let msgError = ''
  const token = searchParams.token ?? ''

  if (token) {
    const response = await verifyResetPasswordToken(token)
    validToken = Boolean(response.success)
    msgError = response.error ?? ''
  }
  console.log(validToken)

  return (
    <CardWrapper
      headerDescription="Reset Password"
      backBtnHref="/auth/login"
      backBtnLabel="Back to login"
    >
      <NewPasswordForm
        msgUnvalidToken={msgError}
        isValidToken={validToken}
        token={token}
      />
    </CardWrapper>
  )
}

export default Page
