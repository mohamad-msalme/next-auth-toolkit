import React from 'react'
import { useForm } from 'react-hook-form'
import { register } from '@/actions/register.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { TRegisterSchema, RegisterSchema } from '@/schemas'

export const useRegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>('')
  const [successMsg, setSuccessMsg] = React.useState<string | undefined>('')

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  })

  const onSubmit = (value: TRegisterSchema) => {
    setIsSubmitting(true)
    setErrorMsg('')
    setSuccessMsg('')
    register(value)
      .then(data => {
        setErrorMsg(data.error)
        setSuccessMsg(data.success)
      })
      .finally(() => {
        setIsSubmitting(false)
        form.reset()
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
