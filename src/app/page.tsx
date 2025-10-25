import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Shopify Headless Storefront
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Built with Next.js 16, TanStack Query, and iron-session
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Link
            href="/products"
            className="border-2 border-black rounded-lg p-6 hover:bg-black hover:text-white transition-colors group"
          >
            <div className="text-4xl mb-4">🛍️</div>
            <h2 className="text-xl font-bold mb-2">Products</h2>
            <p className="text-sm text-gray-600 group-hover:text-gray-200">
              Browse our product catalog
            </p>
          </Link>

          <Link
            href="/cart"
            className="border-2 border-black rounded-lg p-6 hover:bg-black hover:text-white transition-colors group"
          >
            <div className="text-4xl mb-4">🛒</div>
            <h2 className="text-xl font-bold mb-2">Cart</h2>
            <p className="text-sm text-gray-600 group-hover:text-gray-200">
              View your shopping cart
            </p>
          </Link>

          <Link
            href="/account"
            className="border-2 border-black rounded-lg p-6 hover:bg-black hover:text-white transition-colors group"
          >
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-xl font-bold mb-2">Account</h2>
            <p className="text-sm text-gray-600 group-hover:text-gray-200">
              Manage your account
            </p>
          </Link>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-left">
          <h2 className="text-2xl font-bold mb-4">Architecture Highlights</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Server-side Shopify API integration (credentials never exposed)</li>
            <li>✅ TanStack Query for client-side state management</li>
            <li>✅ Server Actions for mutations</li>
            <li>✅ iron-session for secure authentication</li>
            <li>✅ Protected routes with middleware</li>
            <li>✅ Guest + authenticated user support</li>
            <li>✅ TypeScript + GraphQL type generation</li>
          </ul>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Update your <code>.env</code> file with Shopify
              credentials to enable API functionality. See <code>ARCHITECTURE.md</code> for details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
