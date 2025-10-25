import { getProductByHandle } from '@/actions/products';
import { AddToCartButton } from '@/components/add-to-cart-button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

/**
 * Server Component - Product Detail Page
 * Demonstrates dynamic routing with server-side data fetching
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const result = await getProductByHandle(handle);

  if (!result.success || !(result.data as any)?.productByHandle) {
    notFound();
  }

  const product = (result.data as any).productByHandle;
  const price = product.priceRange.minVariantPrice;
  const mainImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Product Images */}
        <div className="space-y-4">
          {mainImage && (
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {product.images.edges.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.edges.slice(1, 5).map(({ node: image }: any, idx: number) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-100 rounded overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={image.altText || `${product.title} ${idx + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <p className="text-2xl font-bold mb-6">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currencyCode,
            }).format(parseFloat(price.amount))}
          </p>

          {product.description && (
            <div className="prose mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}

          {/* Variants */}
          {product.variants.edges.length > 1 && (
            <div className="mb-6">
              <label className="block font-semibold mb-2">Select Variant</label>
              <select className="w-full px-4 py-2 border rounded-lg">
                {product.variants.edges.map(({ node: variant }: any) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.title} -{' '}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: variant.priceV2.currencyCode,
                    }).format(parseFloat(variant.priceV2.amount))}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Add to Cart - Client Component with TanStack Query */}
          {firstVariant && (
            <AddToCartButton
              variantId={firstVariant.id}
              available={firstVariant.availableForSale}
            />
          )}

          {/* Additional Info */}
          {product.descriptionHtml && (
            <div className="mt-8 border-t pt-8">
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600; // 1 hour
