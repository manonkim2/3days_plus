import { supabase } from "@/utils/supabaseClient"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: 'http://localhost:3000/dashboard',
        },
    })


    if (error) {
        return NextResponse.error()
    }

    if (data.url) {
        return redirect(data.url)
    }
}