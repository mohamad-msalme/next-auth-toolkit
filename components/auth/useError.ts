import { useSearchParams } from 'next/navigation'

export const useError = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') ?? 'no_error'
  switch (error) {
    case 'no_error':
      return ''
    case 'CredentialsSignin':
      return 'Invalid credantional'
    case 'OAuthAccountNotLinked':
      return 'Email has already used by another provider'
    default:
      return 'Somthing went wrong, Please try again'
  }
}
