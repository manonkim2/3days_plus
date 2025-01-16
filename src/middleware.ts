import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "./utils/supabase/actions";

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
    const user = await getUserInfo()

    const isPublicPage = publicOnlyUrl[request.nextUrl.pathname]


    if (!user && !isPublicPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
