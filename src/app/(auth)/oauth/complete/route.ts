import { NextResponse } from 'next/server'
import { notFound } from 'next/navigation'

import { serverCreateClient } from '@/utils/supabase/server'
import db from '@/utils/db'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = await searchParams.get('code')

    if (code) {
        const supabase = await serverCreateClient()
        const { error, data: { user } } = await supabase.auth.exchangeCodeForSession(code)

        if (!user) {
            alert('유저 정보가 존재하지 않습니다.')
            return NextResponse.redirect(`${origin}/login`)
        }

        if (error) {
            alert('로그인에 실패했습니다.')
            return NextResponse.redirect(`${origin}/login`)
        }

        // google, kakao 동일 email 일 때 identities[1]이 현재 login
        const identity = user.identities!
        const social_login = identity?.length > 1 ? identity[1] : identity[0]

        const existingUsers = await db.user.findUnique({
            where: {
                id: social_login.identity_id,
            }
        })

        if (!existingUsers) {
            await db.user.create({
                data: {
                    id: social_login.identity_id,
                    name: user.user_metadata.name,
                    email: user.email as string,
                    updated_at: user.updated_at,
                    image_url: user.user_metadata.picture as string,
                    social: social_login.provider
                },
            })
        }

        return NextResponse.redirect(`${origin}/dashboard`)
    }

    return notFound()
}