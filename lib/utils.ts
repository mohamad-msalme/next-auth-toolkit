import { Resend } from 'resend'
import { twMerge } from 'tailwind-merge'
import { AuthError } from 'next-auth'
import { type ClassValue, clsx } from 'clsx'
import moment from 'moment-timezone'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isAuthError = (error: any): error is AuthError =>
  error instanceof AuthError

export const sendConfirmationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'next-auth app confirmation email',
    html: `<p>Confirmation code: <a href="${confirmLink}">confirm link</a></p>`
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Confirmation code: <a href="${resetLink}">confirm link</a></p>`
  })
}

export const convertUTCTime = (date: Date) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const d = moment.utc(date).tz(timezone)
  return d.format()
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`
  })
}
