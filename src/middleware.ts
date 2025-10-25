import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { unsealData } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/auth/session';

/**
 * Routes that require authentication
 * Add routes here that should only be accessible to logged-in users
 */
const protectedRoutes = [
  '/account',
  '/orders',
  // Add more protected routes here
];

/**
 * Routes that should only be accessible to guests (not logged in)
 * e.g., login, register pages
 */
const guestOnlyRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get session from cookie
  const cookieName = sessionOptions.cookieName;
  const sessionCookie = request.cookies.get(cookieName);

  let isLoggedIn = false;

  if (sessionCookie?.value) {
    try {
      const session = await unsealData<SessionData>(sessionCookie.value, {
        password: sessionOptions.password,
      });
      isLoggedIn = session.isLoggedIn || false;
    } catch (error) {
      // Invalid or expired session
      isLoggedIn = false;
    }
  }

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if route is guest-only
  const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from guest-only routes
  if (isGuestOnlyRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
