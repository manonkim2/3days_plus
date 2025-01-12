import { supabase } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
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