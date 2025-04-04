import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_ROUTES = new Set(['/schedule', '/profile'])

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname
    const isProtected = PROTECTED_ROUTES.has(pathname)

    if (!user && isProtected) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch (error) {
    console.error('❌ Middleware Auth Error:', error)
    return NextResponse.redirect(new URL('/error', request.url))
  }

  return response
}

export const config = {
  matcher: ['/schedule', '/profile'],
}
