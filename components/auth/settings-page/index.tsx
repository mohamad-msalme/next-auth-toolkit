import React from 'react'
import { SettingsForm } from './SettingsForm'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const SettingsPage: React.FC = async () => {
  return (
    <Card className=" w-[600px]">
      <CardHeader>
        <p className=" text-2xl font-semibold text-center">😁 Settings</p>
      </CardHeader>
      <CardContent>
        <SettingsForm />
      </CardContent>
    </Card>
  )
}
