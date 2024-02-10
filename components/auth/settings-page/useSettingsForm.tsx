import React from 'react'
import { useForm } from 'react-hook-form'
import { settings } from '@/actions/settings'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { TSettingsSchema, SettingsSchema } from '@/schemas'

export const useSettingsForm = () => {
  const session = useCurrentUser()
  const { update } = useSession()
  const [errMsg, setErrorMsg] = React.useState<string | undefined>('')
  const [successMsg, setSuccessMsg] = React.useState<string | undefined>('')
  const [isPending, startTransition] = React.useTransition()
  const form = useForm<TSettingsSchema>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: session?.name || undefined,
      email: session?.email || undefined,
      role: session?.role || undefined,
      newPAssword: undefined,
      password: undefined,
      isTwoFactorEnabled: Boolean(session?.isTwoFactorEnabled)
    }
  })
  const onSubmit = async (value: TSettingsSchema) => {
    startTransition(() => {
      settings(value)
        .then(data => {
          if (data.error) {
            setSuccessMsg('')
            setErrorMsg(data.error)
          }

          if (data.success) {
            setErrorMsg('')
            setSuccessMsg(data.success)
            update()
          }
        })
        .catch(error => {
          setErrorMsg(' Somthing Went wrong')
          setSuccessMsg('')
        })
    })
  }

  return {
    errMsg,
    successMsg,
    isSubmitting: isPending,
    form,
    onSubmit
  }
}
