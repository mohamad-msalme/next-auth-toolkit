import { UserRole } from '@prisma/client'
import * as z from 'zod'
const qwe = UserRole.ADMIN
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

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    password: z.optional(z.string()),
    newPAssword: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean())
  })
  .refine(
    data => {
      if (data.password && !data.newPAssword) {
        return false
      }
      return true
    },
    {
      message: 'New Password is required',
      path: ['newPAssword']
    }
  )
  .refine(
    data => {
      if (!data.password && data.newPAssword) {
        return false
      }
      return true
    },
    {
      message: 'current Password is Required',
      path: ['password']
    }
  )
export type TSettingsSchema = z.infer<typeof SettingsSchema>
