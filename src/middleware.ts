import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PUBLIC_ROUTES = new Set([
  '/',
  '/login',
  '/dashboard',
  '/oauth/google',
  '/oauth/kakao',
  '/oauth/complete',
])

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
    const isPublic = PUBLIC_ROUTES.has(pathname)

    if (!user && !isPublic) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch (error) {
    console.error('❌ Middleware Auth Error:', error)
    return NextResponse.redirect(new URL('/error', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
