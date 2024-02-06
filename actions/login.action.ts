'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { DEFFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema, TLoginFormData } from '@/schemas'

export const login = async (values: TLoginFormData) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields'
    }
  }
  const { email, password } = values
  console.log({ login: false })
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid Credentials'
          }
        default:
          return { error: 'Somthing went wrong' }
      }
    }
  }
}
