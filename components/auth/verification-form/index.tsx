'use client'
import React from 'react'
import { BeatLoader } from 'react-spinners'
import { CardWrapper } from '../card-wrapper'
import { useRouter, useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'
import { FormErrorAlert } from '@/components/ui/form-msg/FormErrorAlert'
import { FormSuccessAlert } from '@/components/ui/form-msg/FormSuccessAlert'
export const NewVerificationForm = () => {
  const [errMsg, setErrorMsg] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const firstRender = React.useRef(true)
  const onSubmit = React.useCallback(() => {
    if (!token) {
      return setErrorMsg('Missing Token')
    }
    newVerification(token!)
      .then(data => {
        setErrorMsg(data?.error)
        setSuccessMsg(data.success)
      })
      .catch(() => setErrorMsg('Somthing went wrong'))
  }, [token])

  React.useEffect(() => {
    if (firstRender.current) {
      onSubmit()
      firstRender.current = false
    }
  }, [onSubmit])
  return (
    <CardWrapper
      headerDescription="Confirming your verification"
      backBtnLabel={'Back to login'}
      backBtnHref={'/auth/login'}
    >
      <div className=" flex items-center flex-col gap-4 justify-center">
        {!errMsg && !successMsg ? <BeatLoader /> : null}

        <FormErrorAlert msg={errMsg} />
        <FormSuccessAlert msg={successMsg} />
      </div>
    </CardWrapper>
  )
}
