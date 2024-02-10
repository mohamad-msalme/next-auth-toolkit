'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verficication-token'

const DEF_RES = {
  error: '',
  success: ''
}
/**
 * The function `newVerification` verifies an email by checking if the token exists, if it has expired,
 * and if the corresponding user exists, and then updates the user's email verification status and
 * deletes the verification token.
 * @param {string} token - The `token` parameter is a string that represents a verification token.
 * @returns an object with properties `error`, `success`, and possibly other properties depending on
 * the value of `DEF_RES`. The value of `error` or `success` will depend on the conditions in the code.
 */
export const newVerification = async (token: string) => {
  const exitingToke = await getVerificationTokenByToken(token)

  if (!exitingToke) {
    return { ...DEF_RES, error: 'Token does not exist' }
  }
  const hasExpired = new Date(exitingToke.expires) < new Date()

  if (hasExpired) {
    return {
      ...DEF_RES,
      error: 'Token has expired'
    }
  }
  const exisitingUser = await getUserByEmail(exitingToke?.email!)

  if (!exisitingUser) {
    return {
      ...DEF_RES,
      error: 'Email does nit exist'
    }
  }

  await db.user.update({
    where: {
      id: exisitingUser.id
    },
    data: {
      emailVerified: new Date(),
      email: exitingToke.email
    }
  })

  await db.verificationToken.delete({
    where: {
      id: exitingToke.id
    }
  })

  return {
    ...DEF_RES,
    success: 'Email verified'
  }
}
