'use client'
import React from 'react'
import { UserRole } from '@prisma/client'
import { useCurrentRole } from '@/hooks/useCurrentRole'
import { FormErrorAlert } from '@/components/ui/form-msg/FormErrorAlert'

type RoleGateProps = {
  msg?: string
}

export const RoleGate: React.FC<React.PropsWithChildren<RoleGateProps>> = ({
  children,
  msg
}) => {
  const role = useCurrentRole()
  if (role !== UserRole.ADMIN) {
    return <FormErrorAlert msg={msg || 'You are not allowed'} />
  }
  return <>{children}</>
}
