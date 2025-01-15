import { serverCreateClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'


export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = await searchParams.get('code')

    if (code) {
        const supabase = await serverCreateClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            return NextResponse.redirect(`${origin}/dashboard`)
        }
    }

    return notFound()
}