import type { NextRequest } from 'next/server'

const ProtectedRoutes = "/in/";
const LogOutRoutes = ["/login", "/register"]

export function middleware(req: NextRequest) {
    const currentUser = req.cookies.get('currentUser')?.value
    const currentRouteIsProtected = req.url.match(ProtectedRoutes);

    if (currentUser && LogOutRoutes.some(path => req.nextUrl.pathname.startsWith(path))) return Response.redirect(new URL("/", req.url))
    if (!currentUser && currentRouteIsProtected) return Response.redirect(new URL('/login', req.url))
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}