import React from 'react'
import { login } from '@/actions/login.action'
import { useForm } from 'react-hook-form'
import { useError } from '../useError'
import { zodResolver } from '@hookform/resolvers/zod'
import { TLoginFormData, LoginSchema } from '@/schemas'

export const useLoginForm = () => {
  const errorSearchParamsMsg = useError()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errMsg, setErrorMsg] = React.useState<string | undefined>('')
  const [successMsg, setSuccessMsg] = React.useState<string | undefined>('')
  const [code, setCode] = React.useState<boolean>(false)

  const form = useForm<TLoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      code: ''
    }
  })

  const onSubmit = async (value: TLoginFormData) => {
    setIsSubmitting(true)
    const data = await login(value)
    setCode(Boolean(data?.twoFactor))
    setSuccessMsg(data?.success)
    setErrorMsg(data?.error)
    setIsSubmitting(false)
  }

  return {
    code,
    isSubmitting,
    errMsg: errMsg || errorSearchParamsMsg,
    successMsg,
    form,
    onSubmit
  }
}
