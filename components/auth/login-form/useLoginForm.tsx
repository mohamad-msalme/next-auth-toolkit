import React from 'react'
import { login } from '@/actions/login.action'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TLoginFormData, LoginSchema } from '@/schemas'

export const useLoginForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>('')
  const [successMsg, setSuccessMsg] = React.useState<string | undefined>('')

  const form = useForm<TLoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (value: TLoginFormData) => {
    setIsSubmitting(true)
    setErrorMsg('')
    setSuccessMsg('')
    login(value)
      .then(data => {
        // setErrorMsg(data.error)
        // setSuccessMsg(data.success)
        form.reset()
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return {
    isSubmitting,
    errorMsg,
    successMsg,
    form,
    onSubmit
  }
}
