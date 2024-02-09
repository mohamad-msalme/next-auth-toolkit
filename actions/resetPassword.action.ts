'use server'

import moment from 'moment'
import { db } from '@/lib/db'
import { signIn } from '@/auth'
import { hashPassword } from '@/lib/cryptPassword'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { DEFFAULT_LOGIN_REDIRECT } from '@/routes'
import { getPasswordTokenByToken } from '@/data/password-reset-token'
import { generatePasswordResetToken } from '@/lib/tokens'
import { isAuthError, sendPasswordResetEmail } from '@/lib/utils'
import {
  ResetPasswordSchema,
  ResetSchema,
  TResetPasswordSchema,
  TResetSchema
} from '@/schemas'

const DEF_RES = {
  success: '',
  error: ''
}
export const resetPassword = async (value: TResetSchema) => {
  const validateField = ResetSchema.safeParse(value)

  if (!validateField.success) {
    return { error: 'Invalid email' }
  }
  const { email } = value
  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  })

  if (!existingUser) {
    return {
      error: 'Email not found'
    }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )
  return {
    success: 'Email has sent'
  }
}

export const verifyResetPasswordToken = async (token: string) => {
  const exisitingPAsswordToken = await getPasswordTokenByToken(token)

  if (!exisitingPAsswordToken) {
    return {
      error: 'Token is invalid'
    }
  }

  const expire =
    new Date(
      exisitingPAsswordToken.expires.getTime() +
        moment().utcOffset() * 60 * 1000
    ).getTime() > new Date().getTime()

  if (!expire) {
    return {
      error: 'Token is expire'
    }
  }

  return {
    success: 'Token is valid'
  }
}

export const updatePassword = async (
  value: TResetPasswordSchema,
  token: string
) => {
  const validateValue = ResetPasswordSchema.safeParse(value)

  if (!validateValue.success) {
    return {
      ...DEF_RES,
      error: 'Invalid Password'
    }
  }
  const { password } = value
  const passwordToken = await db.passwordResetToken.findUnique({
    where: {
      token
    }
  })

  if (!passwordToken) {
    return {
      ...DEF_RES,
      error: 'Invalid Token'
    }
  }

  const hashedPassword = await hashPassword(password)

  await db.user.update({
    where: { email: passwordToken?.email },
    data: {
      password: hashedPassword
    }
  })

  await db.passwordResetToken.delete({
    where: {
      token
    }
  })

  return {
    ...DEF_RES,
    success: 'Password has been changed successfully'
  }
}
