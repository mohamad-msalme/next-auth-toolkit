import React from 'react'
import { FaUser } from 'react-icons/fa'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { LogoutBtn } from '../logout-button'
import { RiLogoutBoxLine } from 'react-icons/ri'
export const UserButton: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useCurrentUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image ?? undefined}></AvatarImage>
          <AvatarFallback className=" bg-sky-500 flex items-center justify-center">
            <FaUser className=" text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 " align="end">
        <LogoutBtn>
          <DropdownMenuItem className=" gap-x-4">
            <RiLogoutBoxLine className=" h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutBtn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
