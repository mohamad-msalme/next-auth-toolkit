import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ExtendedUser } from '@/next-auth'
import React from 'react'

type TUserInfoProps = {
  user?: ExtendedUser
  label: string
}
export const UserInfo: React.FC<TUserInfoProps> = ({ label, user }) => {
  return (
    <Card className=" w-[600px] shadow-sm">
      <CardHeader>
        <p className=" text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className=" space-y-4">
        <div className=" flex flex-row items-center p-3 shadow-sm justify-between rounded-md">
          <p className=" text-sm font-medium">ID</p>
          <p className="  text-sx p-2  font-mono bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className=" flex flex-row items-center p-3 shadow-sm justify-between rounded-md">
          <p className=" text-sm font-medium">Name</p>
          <p className="  text-sx p-2  font-mono bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className=" flex flex-row items-center p-3 shadow-sm justify-between rounded-md">
          <p className=" text-sm font-medium">Email</p>
          <p className="  text-sx p-2  font-mono bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className=" flex flex-row items-center p-3 shadow-sm justify-between rounded-md">
          <p className=" text-sm font-medium">Role</p>
          <p className="  text-sx p-2  font-mono bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className=" flex flex-row items-center p-3 shadow-sm justify-between rounded-md">
          <p className=" text-sm font-medium">Two Factor Authinication</p>
          <Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
            {Boolean(user?.isTwoFactorEnabled) ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
