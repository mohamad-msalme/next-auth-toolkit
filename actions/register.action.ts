'use server'

import { db } from '@/lib/db'
import { hashPassword } from '@/lib/cryptPassword'
import { getUserByEmail } from '@/data/user'
import { sendConfirmationEmail } from '@/lib/utils'
import { generateVerificationToken } from '@/lib/tokens'
import { RegisterSchema, TRegisterSchema } from '@/schemas'

const DEF_RES = {
  success: '',
  error: ''
}

/**
 * The `register` function is used to register a user by validating their input fields, hashing their
 * password, checking if the email is already in use, creating a new user if it doesn't exist,
 * generating a verification token, and sending a confirmation email.
 * @param {TRegisterSchema} values - The `values` parameter is an object that contains the user's
 * registration information. It should have the following properties:
 * @returns an object with properties `success`, `error`, and other properties from `DEF_RES`. The
 * specific properties that are returned depend on the conditions in the code. If the `validatedFields`
 * are not successful, the returned object will have an `error` property set to `'Invalid fields'`. If
 * `exisitingUser` is found and their email is verified, the returned object
 */
export const register = async (values: TRegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      ...DEF_RES,
      error: 'Invalid fields'
    }
  }

  const { email, password, name } = values
  const hashedPassword = await hashPassword(password)
  const exisitingUser = await getUserByEmail(email)

  if (exisitingUser && exisitingUser.emailVerified) {
    return {
      ...DEF_RES,
      error: 'Email is Already in use'
    }
  }

  if (!exisitingUser) {
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })
  }

  const verificationToken = await generateVerificationToken(email)
  await sendConfirmationEmail(verificationToken.email, verificationToken.token)
  return {
    ...DEF_RES,
    success: 'Confirmation Email sent!'
  }
}
