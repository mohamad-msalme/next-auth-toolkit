'use client'
import { CardWrapperProps } from '.'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type HeaderProps = Pick<CardWrapperProps, 'headerLabel' | 'headerDescription'>

export const Header: React.FC<HeaderProps> = props => {
  const label = props.headerLabel ?? '🔐 Auth'
  const description = props.headerDescription ?? 'Welcom back👋'
  return (
    <CardHeader className=" items-center">
      <CardTitle className=" font-poppins font-semibold text-3xl">
        {label}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  )
}
