import { supabase } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"


export async function GET(_: Request, { params }: { params: { provider: 'google' | 'kakao' } }) {
    const { provider } = params

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: 'http://localhost:3000/google/complete',
        },
    })


    if (error) {
        return NextResponse.error()
    }

    if (data.url) {
        return redirect(data.url)
    }
}