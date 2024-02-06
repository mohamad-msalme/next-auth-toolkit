import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
})
export type TLoginFormData = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
  name: z.string().min(6)
})
export type TRegisterSchema = z.infer<typeof RegisterSchema>
