import React from 'react'
import { FormAlert } from './FormAlert'

type FormErrorAlertProps = {
  msg?: string
}
export const FormErrorAlert: React.FC<FormErrorAlertProps> = ({ msg }) => (
  <FormAlert msg={msg} state="error" />
)
