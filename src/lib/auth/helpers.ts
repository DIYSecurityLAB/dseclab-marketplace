import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData, defaultSession } from './session';

/**
 * Get the current session in Server Actions or Route Handlers
 * Returns the session data with type safety
 */
export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

/**
 * Check if the current user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session.isLoggedIn;
}

/**
 * Require authentication - throws error if not authenticated
 * Use in Server Actions that require auth
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    throw new Error('Authentication required');
  }

  return session;
}
