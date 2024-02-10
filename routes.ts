export const publicRoute = ['/', '/auth/new-verification']

export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password'
]

export const apiAuthPrefix = '/api/auth'

export const DEFFAULT_LOGIN_REDIRECT = '/settings'

export const ProtectedRoutes = [
  {
    href: '/server',
    label: 'Server'
  },
  {
    href: '/client',
    label: 'Client'
  },
  {
    href: '/admin',
    label: 'Admin'
  },
  {
    href: '/settings',
    label: 'Setting'
  }
]
