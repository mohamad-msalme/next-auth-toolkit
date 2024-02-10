import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updatePassword } from '@/actions/resetPassword.action'
import { ResetPasswordSchema, TResetPasswordSchema } from '@/schemas'

export const usePasswordForm = (token: string) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errMsg, setErrorMsg] = React.useState<string | undefined>('')
  const [successMsg, setSuccessMsg] = React.useState<string | undefined>('')
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = async (value: TResetPasswordSchema) => {
    setIsSubmitting(true)
    const data = await updatePassword(value, token)
    setErrorMsg(data?.error)
    setSuccessMsg(data?.success)
    setIsSubmitting(false)
  }

  return {
    isSubmitting,
    errMsg: errMsg,
    form,
    successMsg,
    onSubmit
  }
}
