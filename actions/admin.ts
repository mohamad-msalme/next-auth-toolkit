'use server'
import { UserRole } from '@prisma/client'
import { currentRole } from '@/lib/auth'

/**
 * The `admin` function checks if the current user has the role of an admin and returns a success
 * message if they do, or an error message if they don't.
 * @returns The function `admin` returns an object with either an `error` property or a `success`
 * property. If the `role` is not equal to `UserRole.ADMIN`, then the returned object will have an
 * `error` property with the value `'Not Allowed'`. Otherwise, if the `role` is equal to
 * `UserRole.ADMIN`, then the returned object will have a `success` property with
 */
export const admin = async () => {
  const role = await currentRole()
  if (role !== UserRole.ADMIN) {
    return {
      error: 'Not Allowed'
    }
  }
  return {
    success: 'Allowed'
  }
}
