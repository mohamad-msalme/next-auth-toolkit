import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
  code: z.optional(z.string())
})
export type TLoginFormData = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
  name: z.string().min(6)
})
export type TRegisterSchema = z.infer<typeof RegisterSchema>

export const ResetSchema = z.object({
  email: z.string().email()
})
export type TResetSchema = z.infer<typeof ResetSchema>

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, 'Minimum of 6 characters required')
})
export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
