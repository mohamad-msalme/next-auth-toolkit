import { db } from '@/lib/db'

/**
 * The function `getPasswordTokenByToken` retrieves a password reset token from the database based on
 * the provided token.
 * @param {string} token - The `token` parameter is a string that represents the password reset token.
 * It is used to find a unique password reset token in the database.
 * @returns the password token object that matches the given token. If no matching token is found, it
 * will return null.
 */
export const getPasswordTokenByToken = async (token: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findUnique({
      where: {
        token
      }
    })
    return passwordToken
  } catch (error) {
    return null
  }
}

/**
 * The function `getPasswordTokenByEmail` retrieves a password reset token from the database based on
 * the provided email.
 * @param {string} email - The email parameter is a string that represents the email address of the
 * user for whom you want to retrieve the password reset token.
 * @returns the password reset token associated with the given email address. If no token is found or
 * an error occurs, it will return null.
 */
export const getPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findFirst({
      where: {
        email
      }
    })
    return passwordToken
  } catch (error) {
    return null
  }
}
