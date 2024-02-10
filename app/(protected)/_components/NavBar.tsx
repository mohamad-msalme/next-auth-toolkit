'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserButton } from '@/components/auth/user-button'
import { usePathname } from 'next/navigation'
import { ProtectedRoutes } from '@/routes'

export const NavBar: React.FC = () => {
  const pathName = usePathname()
  return (
    <nav className=" bg-secondary flex justify-between items-center shadow-sm p-4 rounded-xl w-[600px]">
      <div className=" flex gap-x-2">
        {ProtectedRoutes.map(({ href, label }) => (
          <Button
            asChild
            variant={pathName === href ? 'default' : 'outline'}
            key={href}
          >
            <Link href={href}>{label}</Link>
          </Button>
        ))}
      </div>
      <UserButton />
    </nav>
  )
}
