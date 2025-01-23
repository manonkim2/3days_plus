'use server'

import { redirect } from "next/navigation"
import { serverCreateClient } from "./server"
import db from "../db"

const getUserInfo = async () => {
    const supabase = await serverCreateClient()
    const { error,
        data: { user },
    } = await supabase.auth.getUser()

    if (error) {
        console.error(error)
    }

    if (!user) {
        return null
    }

    const identity = user.identities!
    const social_login = identity?.length > 1 ? identity[1] : identity[0]

    const userInfo = await db.user.findUnique({
        where: {
            id: social_login.identity_id,
        },

        select: {
            id: true,
            name: true,
            email: true,
            image_url: true,
            social: true
        }
    })

    return userInfo
}

const signOut = async () => {
    const supabase = await serverCreateClient()
    await supabase.auth.signOut()

    return redirect('/dashboard')

}

export { getUserInfo, signOut }