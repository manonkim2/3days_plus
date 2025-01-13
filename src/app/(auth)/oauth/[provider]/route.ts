import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

import { serverCreateClient } from '@/utils/supabase/server';


export async function GET(_: Request, { params }: { params: { provider: 'google' | 'kakao' } }) {
    const { provider } = await params
    const supabase = await serverCreateClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: 'http://localhost:3000/oauth/complete',
        },
    })

    if (error) {
        return NextResponse.error()
    }

    if (data.url) {
        return redirect(data.url)
    }
}