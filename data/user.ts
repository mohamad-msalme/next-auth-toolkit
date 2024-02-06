import { db } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
  try {
    const result = await db.user.findUnique({
      where: {
        email
      }
    })
    return result
  } catch (error) {
    return undefined
  }
}

export const getUserByName = async (name: string) => {
  try {
    const result = await db.user.findFirst({
      where: {
        name
      }
    })
    return result
  } catch (error) {
    return undefined
  }
}

export const getUserById = async (id: string) => {
  try {
    const result = await db.user.findUnique({
      where: {
        id
      }
    })
    return result
  } catch (error) {
    return undefined
  }
}
