import { db } from '@/lib/db'

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId
      }
    })
    return twoFactorConfirmation
  } catch (error) {
    return null
  }
}

export const getTwoFactorConfirmationById = async (id: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        id
      }
    })
    return twoFactorConfirmation
  } catch (error) {
    return null
  }
}
