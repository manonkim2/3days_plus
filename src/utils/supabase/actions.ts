'use server'

import { redirect } from 'next/navigation'
import { serverCreateClient } from './server'
import db from '../db'

const getUserInfo = async () => {
  try {
    const supabase = await serverCreateClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    const identity = user.identities || []
    const socialLogin = identity?.length > 1 ? identity[1] : identity[0]

    const userInfo = await db.user.findUnique({
      where: {
        id: socialLogin.identity_id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        social: true,
      },
    })

    return userInfo
  } catch (error) {
    console.error('Error fetching user info:', error)
    return null
  }
}

const signOut = async () => {
  const supabase = await serverCreateClient()
  await supabase.auth.signOut()

  return redirect('/dashboard')
}

export { getUserInfo, signOut }
