import React from 'react'
import { useForm } from 'react-hook-form'
import { useError } from '../useError'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetSchema, TResetSchema } from '@/schemas'
import { resetPassword } from '@/actions/resetPassword.action'

export const useResetForm = () => {
  const errorSearchParamsMsg = useError()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errMsg, setErrorMsg] = React.useState<string | undefined>('')
  const [successMsg, setSuccessMsg] = React.useState<string | undefined>('')

  const form = useForm<TResetSchema>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (value: TResetSchema) => {
    setIsSubmitting(true)
    setErrorMsg('')
    setSuccessMsg('')
    const data = await resetPassword(value)
    setSuccessMsg(data?.success)
    setErrorMsg(data?.error)
    setIsSubmitting(false)
  }

  return {
    isSubmitting,
    errMsg: errMsg || errorSearchParamsMsg,
    successMsg,
    form,
    onSubmit
  }
}
