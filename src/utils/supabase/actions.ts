'use server'

import { redirect } from "next/navigation"
import { serverCreateClient } from "./server"

const getUserInfo = async () => {
    const supabase = await serverCreateClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return user
}

const signOut = async () => {
    const supabase = await serverCreateClient()
    await supabase.auth.signOut()

    return redirect('/dashboard')

}

export { getUserInfo, signOut }