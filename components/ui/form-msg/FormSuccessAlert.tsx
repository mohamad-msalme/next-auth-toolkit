import React from 'react'
import { FormAlert } from './FormAlert'

type FormSuccessAlertProps = {
  msg?: string
}
export const FormSuccessAlert: React.FC<FormSuccessAlertProps> = ({ msg }) => (
  <FormAlert msg={msg} state="success" />
)
