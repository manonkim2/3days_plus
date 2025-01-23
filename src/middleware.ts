import { NextRequest, NextResponse } from 'next/server'
import { serverCreateClient } from './utils/supabase/server'

interface Routes {
  [key: string]: boolean
}

const publicOnlyUrl: Routes = {
  '/': true,
  '/login': true,
  '/signup': true,
  '/dashboard': true,
  '/oauth/google': true,
  '/oauth/kakao': true,
  '/oauth/complete': true,
}

export const middleware = async (request: NextRequest) => {
  try {
    const supabase = await serverCreateClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const isPublicPage = publicOnlyUrl[request.nextUrl.pathname]

    if (!user && !isPublicPage) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch (error) {
    console.error('Middleware Error:', error)
    return NextResponse.redirect(new URL('/error', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
