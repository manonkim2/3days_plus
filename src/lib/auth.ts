'use server'

import { getUserInfo } from './supabase/actions'

export const getUserIdOrThrow = async (): Promise<string> => {
  const user = await getUserInfo()

  if (!user?.id) throw new Error('Unauthenticated')

  return user.id
}
