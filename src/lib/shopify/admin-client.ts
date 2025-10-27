import { createAdminApiClient } from '@shopify/admin-api-client';
import { shopifyConfig, validateShopifyAdminConfig } from '@/config/shopify.config';

validateShopifyAdminConfig();

/**
 * Shopify Admin API client singleton
 * Used for admin operations: manage products, orders, customers, inventory
 * NOTE: This should only be used in server-side code, never exposed to client
 */
export const adminClient = createAdminApiClient({
  storeDomain: shopifyConfig.storeDomain!,
  apiVersion: shopifyConfig.apiVersion,
  accessToken: shopifyConfig.adminAccessToken!,
});

/**
 * Helper function to execute Admin API GraphQL queries with error handling
 */
export async function adminQuery<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
    const response = await adminClient.request(query, {
      variables: variables || {},
    });

    if (response.errors) {
      console.error('Admin API GraphQL Errors:', response.errors);
      throw new Error(
        `GraphQL Error: ${(response.errors as any[]).map((e) => e.message).join(', ')}`
      );
    }

    return response.data as T;
  } catch (error) {
    console.error('Admin API Request Error:', error);
    throw error;
  }
}
