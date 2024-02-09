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
