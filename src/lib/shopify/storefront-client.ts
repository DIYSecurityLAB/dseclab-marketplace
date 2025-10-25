import { createStorefrontApiClient } from '@shopify/storefront-api-client';

if (!process.env.SHOPIFY_STORE_DOMAIN) {
  throw new Error('SHOPIFY_STORE_DOMAIN is not defined');
}

if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined');
}

/**
 * Shopify Storefront API client singleton
 * Used for customer-facing operations: products, collections, cart, checkout
 */
export const storefrontClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: '2025-01',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

/**
 * Helper function to execute GraphQL queries with error handling
 */
export async function storefrontQuery<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
    const response = await storefrontClient.request(query, {
      variables: variables || {},
    });

    if (response.errors) {
      console.error('Storefront API GraphQL Errors:', response.errors);
      throw new Error(
        `GraphQL Error: ${(response.errors as any[]).map((e) => e.message).join(', ')}`
      );
    }

    return response.data as T;
  } catch (error) {
    console.error('Storefront API Request Error:', error);
    throw error;
  }
}
