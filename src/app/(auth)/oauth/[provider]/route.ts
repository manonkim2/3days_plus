import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

import { serverCreateClient } from '@/utils/supabase/server';
import { Provider } from "@supabase/supabase-js";



export async function GET(_: Request, { params }: { params: Promise<{ provider: Provider }> }) {
    const { provider } = await params
    const supabase = await serverCreateClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: 'http://localhost:3000/oauth/complete',
        },
    })

    if (error) {
        console.error('인증 실패', error.message)
        alert('인증에 실패했습니다. 다시 시도해 주세요.')
    }

    if (data.url) {
        return redirect(data.url)
    }
}