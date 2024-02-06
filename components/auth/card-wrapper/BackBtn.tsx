import { Button } from '@/components/ui/button'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren } from 'react'

export const BackBtn: React.FC<PropsWithChildren<LinkProps>> = ({
  children,
  ...linkProps
}) => {
  return (
    <Link {...linkProps}>
      <Button variant="link">{children}</Button>
    </Link>
  )
}
