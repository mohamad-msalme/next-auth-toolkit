import { db } from '@/lib/db'

/**
 * The function `account` retrieves an account object from the database based on the provided userId.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used to find the account associated with that user in the database.
 * @returns The `account` object is being returned.
 */
export const account = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId }
    })
    return account
  } catch (error) {
    console.log('erro')
  }
}
