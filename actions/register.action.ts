'use server'

import { db } from '@/lib/db'
import { hashPassword } from '@/lib/cryptPassword'
import { getUserByEmail } from '@/data/user'
import { RegisterSchema, TRegisterSchema } from '@/schemas'

export const register = async (values: TRegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields'
    }
  }

  const { email, password, name } = values
  const hashedPassword = await hashPassword(password)
  const exisitingUser = await getUserByEmail(email)

  if (exisitingUser) {
    return {
      error: 'Email is Already in use'
    }
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })
  return {
    success: 'User Created'
  }
}
