import { Header } from './Header'
import { Socials } from './Social'
import { BackBtn } from './BackBtn'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export type CardWrapperProps = {
  headerLabel?: string
  headerDescription?: string
  backBtnLabel: string
  backBtnHref: string
  showSocial?: boolean
}

export const CardWrapper: React.FC<
  React.PropsWithChildren<CardWrapperProps>
> = ({
  headerLabel,
  headerDescription,
  children,
  showSocial,
  backBtnHref,
  backBtnLabel
}) => {
  return (
    <Card className=" w-[400px] shadow-md">
      <Header headerLabel={headerLabel} headerDescription={headerDescription} />
      <CardContent>{children}</CardContent>
      <CardFooter className=" flex flex-col gap-4">
        <Socials showSocial={showSocial} />
        <BackBtn href={backBtnHref}>{backBtnLabel}</BackBtn>
      </CardFooter>
    </Card>
  )
}
