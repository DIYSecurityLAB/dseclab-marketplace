import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { shopifyConfig, validateShopifyConfig } from '@/config/shopify.config';

validateShopifyConfig();

/**
 * Shopify Storefront API client singleton
 * Used for customer-facing operations: products, collections, cart, checkout
 */
export const storefrontClient = createStorefrontApiClient({
  storeDomain: shopifyConfig.storeDomain!,
  apiVersion: shopifyConfig.apiVersion,
  publicAccessToken: shopifyConfig.storefrontAccessToken!,
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
