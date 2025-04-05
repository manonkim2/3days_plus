'use server'

import { getUserInfo } from './supabase/actions'

export const withUserInfo = async <T>(
  callback: (userId: string) => Promise<T>,
): Promise<T> => {
  try {
    const user = await getUserInfo()
    if (!user?.id) throw new Error('User information is missing.')

    return await callback(user.id)
  } catch (error) {
    console.error('Database operation failed:', error)

    return Promise.reject(
      new Error('An error occurred while processing the request.'),
    )
  }
}
