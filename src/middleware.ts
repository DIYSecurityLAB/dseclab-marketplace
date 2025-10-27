import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { unsealData } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/auth/session';
import { routing } from '@/config/i18n/routing';

/**
 * Routes that require authentication (without locale prefix)
 * Add routes here that should only be accessible to logged-in users
 */
const protectedRoutes = ['/account', '/orders'];

/**
 * Routes that should only be accessible to guests (not logged in)
 * e.g., login, register pages
 */
const guestOnlyRoutes = ['/login', '/register'];

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // First, handle i18n routing
  const response = intlMiddleware(request);

  // Extract locale from pathname (e.g., /en/account -> en)
  const pathnameLocale = pathname.split('/')[1];
  const locale = routing.locales.includes(pathnameLocale as any)
    ? pathnameLocale
    : routing.defaultLocale;

  // Remove locale prefix from pathname for auth checks
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

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
    pathnameWithoutLocale.startsWith(route)
  );

  // Check if route is guest-only
  const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', pathnameWithoutLocale);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from guest-only routes
  if (isGuestOnlyRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(`/${locale}/account`, request.url));
  }

  return response;
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
