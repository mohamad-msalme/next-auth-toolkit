import { Inter, Poppins } from 'next/font/google'
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '100', '300', '500', '600', '700', '800', '900']
})
export const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '100', '300', '500', '600', '700', '800', '900']
})
