'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verficication-token'

const DEF_RES = {
  error: '',
  success: ''
}
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
