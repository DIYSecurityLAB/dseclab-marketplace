'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCurrentSession } from '@/actions/auth';
import { useEffect, useState } from 'react';

/**
 * Client Component - Navigation Bar
 * Shows cart count and user session status
 */
export function Navigation() {
  const [cartItemCount, setCartItemCount] = useState(0);

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  // Get cart item count from localStorage (simplified)
  useEffect(() => {
    const cartId = localStorage.getItem('shopify_cart_id');
    if (cartId) {
      // In a real app, you'd fetch cart data and count items
      // For now, just showing the UI pattern
      setCartItemCount(0);
    }
  }, []);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Shopify Store
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="hover:text-gray-600 transition-colors"
            >
              Products
            </Link>

            <Link
              href="/cart"
              className="hover:text-gray-600 transition-colors relative"
            >
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {session?.isLoggedIn ? (
              <Link
                href="/account"
                className="hover:text-gray-600 transition-colors"
              >
                Account
              </Link>
            ) : (
              <Link
                href="/login"
                className="hover:text-gray-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
