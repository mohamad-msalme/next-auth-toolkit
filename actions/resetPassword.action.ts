'use server'

import moment from 'moment'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/cryptPassword'
import { getPasswordTokenByToken } from '@/data/password-reset-token'
import { generatePasswordResetToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/utils'
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
/**
 * The `resetPassword` function takes in an email address, checks if it is valid and exists in the
 * database, generates a password reset token, and sends an email with the token.
 * @param {TResetSchema} value - The parameter `value` is of type `TResetSchema`, which is a schema for
 * resetting a password. It likely contains the following properties:
 * @returns an object with either an "error" or "success" property. If there is an error, the object
 * will have an "error" property with a corresponding error message. If the function is successful, the
 * object will have a "success" property with a success message.
 */
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

/**
 * The function `verifyResetPasswordToken` verifies if a given password reset token is valid or
 * expired.
 * @param {string} token - The `token` parameter is a string that represents the reset password token
 * that needs to be verified.
 * @returns an object with either an "error" property or a "success" property. If the password token is
 * invalid, the function returns an object with an "error" property set to 'Token is invalid'. If the
 * password token is expired, the function returns an object with an "error" property set to 'Token is
 * expired'. If the password token is valid, the function returns an
 */
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

/**
 * The function `updatePassword` updates a user's password in the database using a reset token and
 * returns a success message if the password is changed successfully.
 * @param {TResetPasswordSchema} value - The `value` parameter is of type `TResetPasswordSchema`, which
 * represents the data needed to reset a password. It likely includes properties such as `password` and
 * possibly other fields related to password reset.
 * @param {string} token - The `token` parameter is a string that represents the password reset token.
 * It is used to verify the validity of the token before updating the password.
 * @returns an object with properties `success` and `error`. If the `validateValue` is not successful,
 * it will return an object with `error` property set to 'Invalid Password'. If the `passwordToken` is
 * not found, it will return an object with `error` property set to 'Invalid Token'. If the password
 * update is successful, it will return an object with
 */
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
