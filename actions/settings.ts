'use server'

import { db } from '@/lib/db'
import { compare } from 'bcryptjs'
import { currentUser } from '@/lib/auth'
import { hashPassword } from '@/lib/cryptPassword'
import { TSettingsSchema } from '@/schemas'
import { sendConfirmationEmail } from '@/lib/utils'
import { generateVerificationToken } from '@/lib/tokens'
import { getUserByEmail, getUserById } from '@/data/user'

const DEF_RES = {
  error: '',
  success: ''
}

/**
 * The above function is a TypeScript function that updates user settings based on the provided values,
 * including email, password, and two-factor authentication.
 * @param {TSettingsSchema} values - The `values` parameter is an object that represents the settings
 * to be updated. It contains properties such as `email`, `newPassword`, `password`, and
 * `isTwoFactorEnabled`. These properties are used to update the user's settings.
 * @returns an object with properties `success` and `error`. The specific values of these properties
 * depend on the conditions and logic within the function.
 */
export const settings = async (values: TSettingsSchema) => {
  const user = await currentUser()

  if (!user) {
    return {
      ...DEF_RES,
      error: 'Not Authinicated'
    }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return {
      ...DEF_RES,
      error: 'Not Authinicated'
    }
  }

  if (user.provider !== 'credentials') {
    values.email = undefined
    values.newPAssword = undefined
    values.password = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const exisitingUser = await getUserByEmail(values.email)

    if (exisitingUser && exisitingUser.id !== user.id) {
      return {
        ...DEF_RES,

        error: 'New Email is already exist'
      }
    }

    const verificationToken = await generateVerificationToken(values.email)

    await sendConfirmationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return {
      ...DEF_RES,

      success: 'Verification Email sent'
    }
  }
  console.log({ values })
  if (values.password && values.newPAssword && dbUser.password) {
    const passwordMatch = await compare(values.password, dbUser.password)
    if (!passwordMatch) {
      return {
        ...DEF_RES,
        error: 'Incorrect password'
      }
    }
    const hashedPAssword = await hashPassword(values.newPAssword)
    values.password = hashedPAssword
  }
  const { newPAssword, ...rest } = values
  await db.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      ...rest
    }
  })

  return {
    ...DEF_RES,
    success: 'Success'
  }
}
