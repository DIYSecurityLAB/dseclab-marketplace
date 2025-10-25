import { SessionOptions } from 'iron-session';

export interface SessionData {
  userId?: string;
  email?: string;
  customerId?: string;
  customerAccessToken?: string;
  isLoggedIn: boolean;
}

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined');
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: process.env.SESSION_COOKIE_NAME || 'shopify_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};
