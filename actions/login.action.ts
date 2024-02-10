'use server'

import { db } from '@/lib/db'
import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { DEFFAULT_LOGIN_REDIRECT } from '@/routes'
import { getTwoFactorTokenByToken } from '@/data/two-factor-token'
import { LoginSchema, TLoginFormData } from '@/schemas'
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens'
import {
  isAuthError,
  sendConfirmationEmail,
  sendTwoFactorTokenEmail
} from '@/lib/utils'
import moment from 'moment'

const DEF_RES = {
  twoFactor: false,
  success: '',
  error: ''
}

/**
 * The `login` function handles the login process by validating the form data, checking if the user
 * exists, sending a confirmation email if the user's email is not verified, and performing either a
 * two-factor authentication or a regular credential sign-in.
 * @param {TLoginFormData} values - The `values` parameter is of type `TLoginFormData`, which
 * represents the form data submitted during the login process. It likely contains properties such as
 * `email` and `password`, which are used to authenticate the user.
 * @returns an object with properties based on the conditions met in the code. The possible properties
 * that can be returned are:
 */
export const login = async (values: TLoginFormData) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) throw Error('Invalid fields')

  const existingUser = await getUserByEmail(values.email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { ...DEF_RES, error: 'Email does not exist' }
  }

  if (!existingUser.emailVerified) {
    try {
      const verficicationToken = await generateVerificationToken(
        existingUser.email
      )
      await sendConfirmationEmail(
        verficicationToken.email,
        verficicationToken.token
      )
      return {
        ...DEF_RES,
        success: 'Confirmation Email sent!'
      }
    } catch (error) {
      return {
        ...DEF_RES,
        error: 'Confirmation Email not sent!, please try again'
      }
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    return await credintionalSignInBy2FA(values, existingUser.id)
  } else {
    return await credintionalSignIn(values)
  }
}

/**
 * The function `credintionalSignInBy2FA` is used for handling the sign-in process with two-factor
 * authentication, including validation of fields, sending a confirmation email with a token, verifying
 * the token, and performing the sign-in process.
 * @param {TLoginFormData} values - The `values` parameter is of type `TLoginFormData` and represents
 * the form data submitted during the login process. It contains fields such as email, password, and
 * code (for two-factor authentication).
 * @param {string} userId - The `userId` parameter is a string that represents the user's ID. It is
 * used to identify the user for whom the two-factor authentication is being performed.
 * @returns an object with various properties depending on the conditions met within the function. The
 * properties that can be returned are:
 */
export const credintionalSignInBy2FA = async (
  values: TLoginFormData,
  userId: string
) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success)
    return {
      ...DEF_RES,
      twoFactor: true,
      error: 'Invalid fields'
    }

  if (!values.code) {
    const twoFactorToken = await generateTwoFactorToken(values.email)
    await sendTwoFactorTokenEmail(values.email, twoFactorToken.token)

    return {
      ...DEF_RES,
      success: 'Confirmation Email has been sent',
      twoFactor: true
    }
  }

  const exisitingTwoFActorToken = await getTwoFactorTokenByToken(values.code)
  if (!exisitingTwoFActorToken) {
    return { ...DEF_RES, twoFactor: true, error: 'Invalid Token' }
  }

  const hasExpire =
    new Date(
      exisitingTwoFActorToken.expires.getTime() +
        moment().utcOffset() * 60 * 1000
    ).getTime() < new Date().getTime()

  if (hasExpire) {
    return { ...DEF_RES, twoFactor: true, error: 'Token expire' }
  }

  await db.twoFactorConfirmation.create({
    data: {
      userId
    }
  })

  await db.twoFactorToken.delete({
    where: { id: exisitingTwoFActorToken.id }
  })

  await credintionalSignIn(values)
}

/**
 * The function `credintionalSignIn` is an asynchronous function that takes in a `values` object and
 * performs a sign-in operation using the provided credentials, handling various error cases and
 * returning an appropriate response.
 * @param {TLoginFormData} values - The parameter `values` is of type `TLoginFormData`, which
 * represents the form data for a login form. It contains the following fields:
 * @returns an object with properties `success`, `error`, and other properties from `DEF_RES`. The
 * value of `success` will be `true` if the sign-in is successful, and `false` otherwise. The value of
 * `error` will be a string indicating the reason for the error, such as 'Invalid fields', 'Invalid
 * credentials', 'Email is already exist with another provider
 */
export const credintionalSignIn = async (values: TLoginFormData) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success)
    return {
      ...DEF_RES,
      error: 'Invalid fields'
    }

  try {
    const { email, password, code } = values
    await signIn('credentials', {
      email,
      password,
      code,
      redirectTo: DEFFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (isRedirectError(error)) throw error
    if (isAuthError(error)) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            ...DEF_RES,
            error: 'Invalid credintionals'
          }
        case 'OAuthAccountNotLinked':
          return {
            ...DEF_RES,
            error: 'Email is already exisit with another provider'
          }
        default:
          return {
            ...DEF_RES,
            error: 'Somthing went wrong'
          }
      }
    }
    return {
      ...DEF_RES,
      error: 'Somthing went wrong'
    }
  }
}
