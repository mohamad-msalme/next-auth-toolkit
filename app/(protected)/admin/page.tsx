'use client'
import React from 'react'
import { RoleGate } from '@/components/auth/role-gate'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FormSuccessAlert } from '@/components/ui/form-msg/FormSuccessAlert'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { admin } from '@/actions/admin'

const Page: React.FC = () => {
  const onApiRouteClick = async () => {
    fetch('/api/admin').then(response => {
      if (response.ok) {
        toast.success('Allowrd api route')
      } else {
        toast.error('Not Allowrd')
      }
    })
  }
  const onClientRouteClick = async () => {
    admin().then(response => {
      if (response.success) {
        toast.success('Allowrd api route')
      } else {
        toast.error('Not Allowed')
      }
    })
  }
  return (
    <Card className=" w-[600px]">
      <CardHeader>
        <p className=" text-2xl  font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className=" space-y-4">
        <RoleGate>
          <FormSuccessAlert msg="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className=" text-sm font-medium">Admin-only API Route</p>
          <Button onClick={() => onApiRouteClick()}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className=" text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={() => onClientRouteClick()}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Page
