import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/updateSession'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/schedule', '/news', '/profile'],
}
