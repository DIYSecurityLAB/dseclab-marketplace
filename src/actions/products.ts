'use server';

import { storefrontQuery } from '@/lib/shopify/storefront-client';

/**
 * Server Action: Get all products
 * Can be called from client components using TanStack Query:
 *
 * const { data } = useQuery({
 *   queryKey: ['products'],
 *   queryFn: () => getProducts()
 * });
 */
export async function getProducts() {
  try {
    const query = `
      query GetProducts {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await storefrontQuery(query);
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: 'Failed to fetch products' };
  }
}

/**
 * Server Action: Get product by handle
 */
export async function getProductByHandle(handle: string) {
  try {
    const query = `
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    `;

    const data = await storefrontQuery(query, { handle });
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { success: false, error: 'Failed to fetch product' };
  }
}
