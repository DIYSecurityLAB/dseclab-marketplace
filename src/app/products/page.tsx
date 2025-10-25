import { getProducts } from '@/actions/products';
import Link from 'next/link';

/**
 * Server Component - Products Listing Page
 * Fetches data directly on the server, no client-side JS needed for data fetching
 */
export default async function ProductsPage() {
  const result = await getProducts();

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <p className="text-red-500">Error loading products. Please check your Shopify credentials.</p>
      </div>
    );
  }

  const products = (result.data as any).products.edges;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(({ node: product }: any) => {
            const image = product.images.edges[0]?.node;
            const price = product.priceRange.minVariantPrice;

            return (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {image && (
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.altText || product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}

                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.title}
                  </h2>

                  {product.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <p className="font-bold text-lg">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: price.currencyCode,
                    }).format(parseFloat(price.amount))}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Configure caching/revalidation
 * This will cache the page and revalidate every hour
 */
export const revalidate = 3600; // 1 hour
