import { requireAuth } from '@/lib/auth/helpers';
import { logoutCustomer } from '@/actions/auth';
import Link from 'next/link';

/**
 * Server Component - Account Page (Protected Route)
 * Demonstrates protected routes with session validation
 * This route is protected by middleware.ts
 */
export default async function AccountPage() {
  const session = await requireAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="bg-gray-50 border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Email:</span> {session.email}
            </p>
            <p>
              <span className="font-semibold">Customer ID:</span>{' '}
              {session.customerId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link
            href="/account/orders"
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">Orders</h3>
            <p className="text-gray-600 text-sm">
              View your order history and track shipments
            </p>
          </Link>

          <Link
            href="/account/addresses"
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">Addresses</h3>
            <p className="text-gray-600 text-sm">
              Manage your shipping and billing addresses
            </p>
          </Link>
        </div>

        <form action={logoutCustomer}>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
