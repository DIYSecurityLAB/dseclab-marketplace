import { createAdminApiClient } from '@shopify/admin-api-client';

if (!process.env.SHOPIFY_STORE_DOMAIN) {
  throw new Error('SHOPIFY_STORE_DOMAIN is not defined');
}

if (!process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
  throw new Error('SHOPIFY_ADMIN_ACCESS_TOKEN is not defined');
}

/**
 * Shopify Admin API client singleton
 * Used for admin operations: manage products, orders, customers, inventory
 * NOTE: This should only be used in server-side code, never exposed to client
 */
export const adminClient = createAdminApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: '2025-01',
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
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
