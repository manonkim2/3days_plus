'use server'

import { serverCreateClient } from './server'
import db from '../db'
import { getSiteEnv } from '../env'
import { cache } from 'react'

export interface IUserInfo {
  id: string
  name: string
  email: string
  image_url: string
  social: string | null
}

const getUserInfo = cache(async () => {
  try {
    const supabase = await serverCreateClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const identity = user.identities || []
    const socialLogin = identity?.length > 1 ? identity[1] : identity[0]

    const userInfo = await db.user.findUnique({
      where: {
        id: socialLogin.identity_id,
        environment: getSiteEnv(),
      },

      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        social: true,
      },
    })

    return userInfo ?? null
  } catch (error) {
    console.error('Error fetching user info:', error)
    return null
  }
})

const signOut = async () => {
  const supabase = await serverCreateClient()
  await supabase.auth.signOut()
}

export { getUserInfo, signOut }
