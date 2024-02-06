import React from 'react'
import { LuCheckCircle } from 'react-icons/lu'
import { Alert, AlertTitle } from '../alert'
import { BsExclamationTriangle } from 'react-icons/bs'

type FormAlertProps = {
  msg?: string
  state: 'error' | 'success'
}
export const FormAlert: React.FC<FormAlertProps> = ({ msg, state }) => {
  if (!msg) return null

  const isError = state === 'error'
  const variant = isError ? 'destructive' : 'success'
  const icon = !isError ? (
    <LuCheckCircle className="h-4 w-4 " />
  ) : (
    <BsExclamationTriangle className="h-4 w-4" />
  )

  return (
    <Alert variant={variant} className=" items-center gap-4">
      {icon}
      <AlertTitle>{msg}</AlertTitle>
    </Alert>
  )
}
